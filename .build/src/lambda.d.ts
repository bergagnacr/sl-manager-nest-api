/// <reference types="node" />
import { Handler } from 'aws-lambda';
import { Server } from 'http';
export declare function bootstrapServer(): Promise<Server>;
export declare const handler: Handler;
