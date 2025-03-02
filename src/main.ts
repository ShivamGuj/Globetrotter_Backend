import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as fs from 'fs';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  // Don't override USE_SQLITE if explicitly set in .env
  if (process.env.USE_SQLITE === undefined) {
    const envContent = fs.existsSync('./.env') ? fs.readFileSync('./.env', 'utf8') : '';
    const hasDbUrl = envContent.includes('DB_URL=');
    
    if (!hasDbUrl) {
      logger.warn('No DB_URL found in .env. Setting USE_SQLITE=true as fallback');
      process.env.USE_SQLITE = 'true';
    }
  }

  try {
    const app = await NestFactory.create(AppModule);
    
    // CORS configuration
    app.enableCors({
      origin: [
        'http://localhost:5174',
        'http://localhost:3000',
        'http://127.0.0.1:5174',
        'http://127.0.0.1:3000',
        'https://globetrottergameplay.netlify.app/',
        process.env.FRONTEND_URL || '*'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    });

    // Database schema fixes (only if we have a connection)
    try {
      const dataSource = app.get(getDataSourceToken());
      
      if (dataSource && dataSource.isInitialized) {
        logger.log('Database connection established, checking schema');
        
        try {
          // Apply schema fixes using non-blocking queries that won't fail if things already exist
          await dataSource.query(`
            DO $$
            BEGIN
                -- Make password nullable if it exists
                IF EXISTS (
                    SELECT FROM information_schema.columns 
                    WHERE table_name = 'user' AND column_name = 'password'
                ) THEN
                    ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL;
                END IF;
                
                -- Add highScore if it doesn't exist
                IF NOT EXISTS (
                    SELECT FROM information_schema.columns 
                    WHERE table_name = 'user' AND column_name = 'highScore'
                ) THEN
                    ALTER TABLE "user" ADD COLUMN "highScore" float DEFAULT 0;
                END IF;

                -- Add email column to avoid errors if code references it but DB doesn't have it
                IF NOT EXISTS (
                    SELECT FROM information_schema.columns 
                    WHERE table_name = 'user' AND column_name = 'email'
                ) THEN
                    ALTER TABLE "user" ADD COLUMN "email" VARCHAR(255) NULL;
                END IF;
            END
            $$;
          `).catch(err => {
            logger.warn('Schema modification failed (non-critical): ' + err.message);
          });

          logger.log('Database schema checks completed');
        } catch (schemaError) {
          logger.warn('Schema update error (non-critical): ' + schemaError.message);
        }
      }
    } catch (dbError) {
      logger.warn('Database initialization: ' + dbError.message);
    }
    
    const port = process.env.PORT || 5001;
    await app.listen(port);
    
    logger.log(`Application successfully started on port ${port}`);
  } catch (error) {
    logger.error(`Failed to start application: ${error.message}`);
    process.exit(1);
  }
}
bootstrap();
