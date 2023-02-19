"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.bootstrapServer = void 0;
const express_1 = __importDefault(require("express"));
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const aws_serverless_express_1 = require("aws-serverless-express");
const utils_1 = require("./utils");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
let server;
async function bootstrapServer() {
    await (0, utils_1.setupConfigurationValues)();
    console.log(process.env.REGION);
    const expressApp = (0, express_1.default)();
    const nestApp = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp), {
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
    nestApp.setGlobalPrefix('api');
    await nestApp.init();
    server = (0, aws_serverless_express_1.createServer)(expressApp, undefined);
    return server;
}
exports.bootstrapServer = bootstrapServer;
const handler = async (event, context) => {
    console.log(context);
    server = await bootstrapServer();
    return (0, aws_serverless_express_1.proxy)(server, event, context, 'PROMISE').promise;
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map