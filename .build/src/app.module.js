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
const products_controller_1 = require("./products/products.controller");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const app_controller_1 = require("./app.controller");
const users_controller_1 = require("./users/users.controller");
const products_module_1 = require("./products/products.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes(products_controller_1.ProductsController, users_controller_1.UsersController, app_controller_1.AppController);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: +configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    synchronize: true,
                    entities: [],
                    autoLoadEntities: true,
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map