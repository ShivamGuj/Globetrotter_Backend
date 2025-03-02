"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
        try {
            const dataSource = app.get((0, typeorm_1.getDataSourceToken)());
            logger.log('Database connection established, attempting to fix schema issues');
            await dataSource.query(`
        ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL;
      `).catch(err => {
                logger.warn('ALTER TABLE operation failed (might be already nullable): ' + err.message);
            });
            await dataSource.query(`
        UPDATE "user" SET "password" = 'default_password_please_change' 
        WHERE "password" IS NULL;
      `).catch(err => {
                logger.warn('UPDATE operation failed: ' + err.message);
            });
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
            if (process.env.NODE_ENV === 'development') {
                try {
                    logger.warn('Attempting drastic fix by dropping and recreating user table');
                    await dataSource.query(`
            CREATE TABLE IF NOT EXISTS user_backup AS
            SELECT * FROM "user" WHERE "password" IS NOT NULL;
          `);
                    await dataSource.query(`DROP TABLE IF EXISTS "user" CASCADE;`);
                    await dataSource.synchronize(true);
                    logger.log('User table recreated successfully');
                }
                catch (err) {
                    logger.error('Failed to recreate table: ' + err.message);
                }
            }
            logger.log('Database fixes applied');
        }
        catch (dbError) {
            logger.warn('Database initialization error: ' + dbError.message);
        }
        const port = process.env.PORT || 3001;
        await app.listen(port);
        logger.log(`Application successfully started on port ${port}`);
    }
    catch (error) {
        logger.error(`Failed to start application: ${error.message}`);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map