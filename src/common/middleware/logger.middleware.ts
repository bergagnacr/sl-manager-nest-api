import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: any, _res: Response, next: NextFunction) {
    // this.logger.log(
    //   'AWS Request ID: ' + req.apiGateway && req.apiGateway.context
    //     ? req.apiGateway.context.awsRequestId
    //     : 'Missing AWS request ID',
    // );
    this.logger.log(req);
    next();
  }
}
