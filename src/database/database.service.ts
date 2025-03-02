import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      if (this.dataSource.isInitialized) {
        // Use type casting to safely access properties
        const options = this.dataSource.options as any;
        
        this.logger.log(
          `Successfully connected to PostgreSQL database: ${options.database} at ${options.host}`,
        );
      } else {
        this.logger.error('Database connection not initialized');
      }
    } catch (error) {
      this.logger.error(`Failed to connect to database: ${error.message}`);
    }
  }
}
