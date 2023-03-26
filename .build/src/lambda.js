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
exports.handler = exports.bootstrapServer = void 0;
const aws_serverless_express_1 = require("aws-serverless-express");
const middleware_1 = require("aws-serverless-express/middleware");
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const aws4_axios_1 = __importDefault(require("aws4-axios"));
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const logging_interceptor_1 = require("./common/interceptor/logging.interceptor");
const timeout_interceptor_1 = require("./common/interceptor/timeout.interceptor");
const utils_1 = require("./util/utils");
const binaryMimeTypes = [];
let cachedServer;
const REGION = process.env.REGION || 'us-east-1';
const interceptor = (0, aws4_axios_1.default)({
    region: REGION,
    service: 'es',
});
axios_1.default.interceptors.request.use(interceptor);
async function bootstrapServer() {
    if (!cachedServer) {
        await (0, utils_1.setupConfigurationValues)();
        const expressApp = (0, express_1.default)();
        const { AppModule } = await Promise.resolve().then(() => __importStar(require('./app.module')));
        const nestApp = await core_1.NestFactory.create(AppModule, new platform_express_1.ExpressAdapter(expressApp), {
            logger: ['error', 'warn', 'debug', 'log'],
        });
        nestApp.use((0, middleware_1.eventContext)());
        nestApp.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new timeout_interceptor_1.TimeoutInterceptor());
        nestApp.enableCors();
        nestApp.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
            disableErrorMessages: false,
            transform: true,
        }));
        nestApp.setGlobalPrefix('api');
        await nestApp.init();
        cachedServer = (0, aws_serverless_express_1.createServer)(expressApp, undefined, binaryMimeTypes);
    }
    return cachedServer;
}
exports.bootstrapServer = bootstrapServer;
const handler = async (event, context) => {
    if (event.body &&
        event.headers['Content-Type'].includes('multipart/form-data')) {
        event.body = Buffer.from(event.body, 'binary');
    }
    cachedServer = await bootstrapServer();
    return (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map