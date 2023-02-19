"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const utils_1 = require("../utils");
const serverless_express_1 = __importDefault(require("@vendia/serverless-express"));
const REGION = process.env.REGION || 'us-east-1';
async function bootstrap() {
    await (0, utils_1.setupConfigurationValues)();
    const expressApp = (0, express_1.default)();
    const { AppModule } = await Promise.resolve().then(() => __importStar(require('./app.module')));
    const nestApp = await core_1.NestFactory.create(AppModule, new platform_express_1.ExpressAdapter(expressApp), {
        logger: ['error', 'warn', 'debug', 'log'],
    });
    nestApp.enableCors();
    nestApp.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        disableErrorMessages: false,
        transform: true,
    }));
    nestApp.setGlobalPrefix('products');
    await nestApp.init();
    const app = nestApp.getHttpAdapter().getInstance();
    return (0, serverless_express_1.default)({ app: app });
}
exports.bootstrap = bootstrap;
const handler = async (event, context, callback) => {
    server = server !== null && server !== void 0 ? server : (await bootstrap());
    return server(event, context, callback);
};
exports.handler = handler;
const handler = async (event, context) => {
    cachedServer = await bootstrapServer();
    return proxy(cachedServer, event, context, 'PROMISE').promise;
};
exports.handler = handler;
//# sourceMappingURL=serverless.js.map