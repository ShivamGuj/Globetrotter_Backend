import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { InvitationsModule } from './invitations/invitations.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Check if we have a database URL (preferred for hosted databases)
        const dbUrl = configService.get('DB_URL');
        if (dbUrl) {
          console.log('Using PostgreSQL with connection URL');
          return {
            type: 'postgres',
            url: dbUrl,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
            logging: true,
            autoLoadEntities: true,
            ssl: { rejectUnauthorized: false },
          };
        }
        
        console.log('Using PostgreSQL with individual parameters');
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT', '5432')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME') || configService.get('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          logging: true,
          autoLoadEntities: true,
          ssl: { rejectUnauthorized: false },
        };
      },
    }),
    // Core modules
    UserModule,
    AuthModule,
    InvitationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
