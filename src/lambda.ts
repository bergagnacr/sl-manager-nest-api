import { Handler, Context } from 'aws-lambda';
import express from 'express';
import { Server } from 'http';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import { createServer, proxy } from 'aws-serverless-express';
import { setupConfigurationValues } from './utils';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

let server: Server;

export async function bootstrapServer(): Promise<Server> {
  await setupConfigurationValues();
  console.log(process.env.REGION);
  const expressApp = express();

  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    {
      logger: ['error', 'warn', 'debug', 'log'],
    },
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
  server = createServer(expressApp, undefined);
  return server;
}

export const handler: Handler = async (event: any, context: Context) => {
  console.log(context);
  server = await bootstrapServer();
  return proxy(server, event, context, 'PROMISE').promise;
};
