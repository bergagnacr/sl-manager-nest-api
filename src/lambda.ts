import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import express from 'express';
import axios from 'axios';
import aws4Interceptor from 'aws4-axios';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';

import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';
import { setupConfigurationValues } from './util/utils';

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

    nestApp.use(eventContext());
    nestApp.useGlobalInterceptors(
      new LoggingInterceptor(),
      new TimeoutInterceptor(),
    );
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
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
  if (
    event.body &&
    event.headers['Content-Type'].includes('multipart/form-data')
  ) {
    // before => typeof event.body === string
    event.body = Buffer.from(event.body, 'binary') as unknown as string;
    // after => typeof event.body === <Buffer ...>
  }
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
