"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.bootstrapServer = void 0;
const express_1 = __importDefault(require("express"));
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const middleware_1 = require("aws-serverless-express/middleware");
const aws_serverless_express_1 = require("aws-serverless-express");
const utils_1 = require("./utils");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const aws4_axios_1 = __importDefault(require("aws4-axios"));
const axios_1 = __importDefault(require("axios"));
const binaryMimeTypes = [];
let cachedServer;
const REGION = process.env.REGION || 'us-east-1';
const interceptor = (0, aws4_axios_1.default)({
    region: REGION,
    service: 'es',
});
axios_1.default.interceptors.request.use(interceptor);
async function bootstrapServer() {
    await (0, utils_1.setupConfigurationValues)();
    const expressApp = (0, express_1.default)();
    const nestApp = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp), {
        logger: ['error', 'warn', 'debug', 'log'],
    });
    nestApp.use((0, middleware_1.eventContext)());
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
    return cachedServer;
}
exports.bootstrapServer = bootstrapServer;
const handler = async (event, context) => {
    cachedServer = await bootstrapServer();
    return (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map