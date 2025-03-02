"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: [
                'http://localhost:5173',
                'http://localhost:3000',
                'http://127.0.0.1:5173',
                'http://127.0.0.1:3000'
            ],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            credentials: true,
        });
        const port = process.env.PORT || 3001;
        await app.listen(port);
        logger.log(`Application successfully started on port ${port}`);
        logger.log(`CORS enabled for frontend development servers`);
    }
    catch (error) {
        logger.error(`Failed to start application: ${error.message}`);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map