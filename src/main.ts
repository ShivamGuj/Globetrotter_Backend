import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule);
    
    // Enhanced CORS configuration
    app.enableCors({
      origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
        process.env.FRONTEND_URL || '*'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    });

    // Fix database issues with a more direct approach
    try {
      const dataSource = app.get(getDataSourceToken());
      
      logger.log('Database connection established, attempting to fix schema issues');
      
      // SOLUTION 1: Make the password column nullable in the database directly
      await dataSource.query(`
        ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL;
      `).catch(err => {
        logger.warn('ALTER TABLE operation failed (might be already nullable): ' + err.message);
      });

      // SOLUTION 2: Update any null password values
      await dataSource.query(`
        UPDATE "user" SET "password" = 'default_password_please_change' 
        WHERE "password" IS NULL;
      `).catch(err => {
        logger.warn('UPDATE operation failed: ' + err.message);
      });

      // Add highScore column if it doesn't exist
      await dataSource.query(`
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT FROM information_schema.columns 
                WHERE table_name = 'user' AND column_name = 'highScore'
            ) THEN
                ALTER TABLE "user" ADD COLUMN "highScore" float DEFAULT 0;
            END IF;
        END
        $$;
      `).catch(err => {
        logger.warn('Adding highScore column failed: ' + err.message);
      });

      // SOLUTION 3: If all else fails, recreate the problematic table (CAUTION: data loss risk)
      // Only run this if you're okay with potential data loss or in development
      if (process.env.NODE_ENV === 'development') {
        try {
          logger.warn('Attempting drastic fix by dropping and recreating user table');
          
          // Back up existing users that have passwords
          await dataSource.query(`
            CREATE TABLE IF NOT EXISTS user_backup AS
            SELECT * FROM "user" WHERE "password" IS NOT NULL;
          `);
          
          // Drop and recreate
          await dataSource.query(`DROP TABLE IF EXISTS "user" CASCADE;`);
          
          // Force TypeORM to recreate the table with our entity definition
          await dataSource.synchronize(true);
          
          logger.log('User table recreated successfully');
          
          // Restore backed up users if needed
          // This is commented out because it might not match your new schema
          // await dataSource.query(`
          //   INSERT INTO "user" SELECT * FROM user_backup;
          // `);
        } catch (err) {
          logger.error('Failed to recreate table: ' + err.message);
        }
      }

      logger.log('Database fixes applied');
    } catch (dbError) {
      logger.warn('Database initialization error: ' + dbError.message);
    }
    
    const port = process.env.PORT || 3001;
    await app.listen(port);
    
    logger.log(`Application successfully started on port ${port}`);
  } catch (error) {
    logger.error(`Failed to start application: ${error.message}`);
    process.exit(1);
  }
}
bootstrap();
