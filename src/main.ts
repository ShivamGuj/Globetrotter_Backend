import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    
    const port = process.env.PORT || 3001;
    await app.listen(port);
    
    logger.log(`Application successfully started on port ${port}`);
  } catch (error) {
    logger.error(`Failed to start application: ${error.message}`);
  }
}
bootstrap();
