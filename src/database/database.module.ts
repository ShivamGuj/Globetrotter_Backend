import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'postgres',
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('DatabaseModule');
        logger.log('Attempting to connect to PostgreSQL database...');
        
        // Check if we have a database URL (preferred for hosted databases)
        const dbUrl = configService.get('DB_URL');
        if (dbUrl) {
          logger.log('Using connection URL for PostgreSQL');
          return {
            name: 'postgres',
            type: 'postgres',
            url: dbUrl,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
            ssl: { rejectUnauthorized: false }, // Required for hosted services
          };
        }
        
        // Use individual connection parameters
        return {
          name: 'postgres',
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT', '5432')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME') || configService.get('DB_DATABASE'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: false,
          ssl: { rejectUnauthorized: false }, // Required for hosted services
        };
      },
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
