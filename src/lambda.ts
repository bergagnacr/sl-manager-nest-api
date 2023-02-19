import { Handler, Context } from 'aws-lambda';
import express from 'express';
import { Server } from 'http';
import axios from 'axios';

import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';

import { createServer, proxy } from 'aws-serverless-express';
import { aws4Interceptor } from 'aws4-axios';
import { setupConfigurationValues } from './utils';

const binaryMimeTypes: string[] = [];

let cachedServer: Server;
// const REGION = process.env.REGION || 'us-east-1';
const REGION = 'local';

const interceptor = aws4Interceptor({
  region: REGION,
  service: 'es',
});

console.log(REGION);
// this is not working for versions > 1 of axions... dependency changed for axios and aws4-axios
axios.interceptors.request.use(interceptor);

export async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    await setupConfigurationValues();

    const expressApp = express();
    // We do this to prevent the app from initializing until decryption is complete
    const { AppModule } = await import('./app.module');
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      {
        logger: ['error', 'warn', 'debug', 'log'],
      },
    );
    // nestApp.enableCors();
    // nestApp.useGlobalPipes(
    //   new ValidationPipe({
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //     forbidUnknownValues: true,
    //     disableErrorMessages: false,
    //     transform: true,
    //   }),
    // );
    // nestApp.setGlobalPrefix('products');
    await nestApp.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
    return cachedServer;
  }
}

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
