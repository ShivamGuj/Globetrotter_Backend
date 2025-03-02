import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule);
    
    // Enhanced CORS configuration
    app.enableCors({
      origin: [
        'http://localhost:5173',  // Vite default
        'http://localhost:3000',  // React default
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
  } catch (error) {
    logger.error(`Failed to start application: ${error.message}`);
  }
}
bootstrap();
