import { Handler, Context } from 'aws-lambda';
import express from 'express';
import { Server } from 'http';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { createServer, proxy } from 'aws-serverless-express';
import { setupConfigurationValues } from './utils';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import aws4Interceptor from 'aws4-axios';
import axios from 'axios';

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;
const REGION = process.env.REGION || 'us-east-1';

const interceptor = aws4Interceptor({
  region: REGION,
  service: 'es',
});

axios.interceptors.request.use(interceptor);

export async function bootstrapServer(): Promise<Server> {
  await setupConfigurationValues();
  const expressApp = express();

  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    {
      logger: ['error', 'warn', 'debug', 'log'],
    },
  );
  nestApp.use(eventContext());
  nestApp.enableCors();
  nestApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      disableErrorMessages: false,
      transform: true,
    }),
  );
  nestApp.setGlobalPrefix('api');
  await nestApp.init();
  cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
