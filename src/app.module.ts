import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { CityController } from './controllers/city.controller';
import { CityService } from './services/city.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesController } from './cities/cities.controller';
import { CitiesService } from './cities/cities.service';
import { DatabaseModule } from './database/database.module';
import { TestModule } from './test/test.module';
import { InvitationsModule } from './invitations/invitations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: parseInt(configService.get('DB_PORT', '5432')),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'headout'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Disable auto-sync temporarily
        logging: true,
        // Add these options to fix the schema migration issue
        migrationsRun: false,
        dropSchema: false,
        // Set to false to avoid automatic schema sync initially
        // We'll handle the schema sync manually in a safer way
        autoLoadEntities: true,
      }),
    }),
    DatabaseModule, // PostgreSQL connection
    // Removing the SQLite connection as we're now using PostgreSQL
    UserModule,
    AuthModule,
    TestModule,
    InvitationsModule,
  ],
  controllers: [CityController, AppController, CitiesController],
  providers: [CityService, AppService, CitiesService],
})
export class AppModule {}
