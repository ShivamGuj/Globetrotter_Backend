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
      useFactory: (configService: ConfigService) => {
        const useSqlite = configService.get('USE_SQLITE') === 'true';
        
        if (useSqlite) {
          console.log('Using SQLite database');
          return {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            autoLoadEntities: true,
          };
        }
        
        // Check if we have a database URL (preferred for hosted databases)
        const dbUrl = configService.get('DB_URL');
        if (dbUrl) {
          console.log('Using PostgreSQL database with connection URL');
          return {
            type: 'postgres',
            url: dbUrl,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
            logging: true,
            autoLoadEntities: true,
            ssl: { rejectUnauthorized: false }, // Required for Render and most hosted services
          };
        }
        
        console.log('Using PostgreSQL database with individual parameters');
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT', '5432')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME') || configService.get('DB_DATABASE'), // Try both parameter names
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          logging: true,
          autoLoadEntities: true,
          ssl: { rejectUnauthorized: false }, // Required for Render and most hosted services
        };
      },
    }),
    DatabaseModule, // PostgreSQL connection
    UserModule,
    AuthModule,
    TestModule,
    InvitationsModule,
  ],
  controllers: [CityController, AppController, CitiesController],
  providers: [CityService, AppService, CitiesService],
})
export class AppModule {}
