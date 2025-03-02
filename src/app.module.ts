import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { CityController } from './controllers/city.controller';
import { CityService } from './services/city.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesController } from './cities/cities.controller';
import { CitiesService } from './cities/cities.service';
import { DatabaseModule } from './database/database.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule, // PostgreSQL connection
    // Removing the SQLite connection as we're now using PostgreSQL
    UserModule,
    AuthModule,
    TestModule,
  ],
  controllers: [CityController, AppController, CitiesController],
  providers: [CityService, AppService, CitiesService],
})
export class AppModule {}
