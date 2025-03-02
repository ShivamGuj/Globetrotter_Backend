"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const city_controller_1 = require("./controllers/city.controller");
const city_service_1 = require("./services/city.service");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const cities_controller_1 = require("./cities/cities.controller");
const cities_service_1 = require("./cities/cities.service");
const database_module_1 = require("./database/database.module");
const test_module_1 = require("./test/test.module");
const invitations_module_1 = require("./invitations/invitations.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
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
                            ssl: { rejectUnauthorized: false },
                        };
                    }
                    console.log('Using PostgreSQL database with individual parameters');
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
            database_module_1.DatabaseModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            test_module_1.TestModule,
            invitations_module_1.InvitationsModule,
        ],
        controllers: [city_controller_1.CityController, app_controller_1.AppController, cities_controller_1.CitiesController],
        providers: [city_service_1.CityService, app_service_1.AppService, cities_service_1.CitiesService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map