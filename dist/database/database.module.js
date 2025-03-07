"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const database_service_1 = require("./database.service");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                name: 'postgres',
                useFactory: (configService) => {
                    const logger = new common_1.Logger('DatabaseModule');
                    logger.log('Attempting to connect to PostgreSQL database...');
                    const dbUrl = configService.get('DB_URL');
                    if (dbUrl) {
                        logger.log('Using connection URL for PostgreSQL');
                        return {
                            name: 'postgres',
                            type: 'postgres',
                            url: dbUrl,
                            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                            synchronize: false,
                            ssl: { rejectUnauthorized: false },
                        };
                    }
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
                        ssl: { rejectUnauthorized: false },
                    };
                },
            }),
        ],
        providers: [database_service_1.DatabaseService],
        exports: [database_service_1.DatabaseService],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map