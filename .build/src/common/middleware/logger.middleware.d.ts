import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
export declare class LoggerMiddleware implements NestMiddleware {
    private readonly logger;
    use(req: any, _res: Response, next: NextFunction): void;
}
