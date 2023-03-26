import { Logger } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { LoggingInterceptor } from './logging.interceptor';

const executionContext = {
  switchToHttp: jest.fn().mockReturnThis(),
  getRequest: jest.fn().mockReturnThis(),
};

const nextCallHandler = {
  handle: () => of({}),
};

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;
  const loggerSpy = jest.spyOn(Logger.prototype, 'log');

  beforeEach(() => {
    interceptor = new LoggingInterceptor();
  });

  it('should called Logger 2 times', (done: any) => {
    const responseInterceptor: Observable<any> = interceptor.intercept(
      executionContext as any,
      nextCallHandler,
    );

    responseInterceptor.subscribe({
      next: jest.fn(),
      error: (error) => {
        throw error;
      },
      complete: () => {
        expect(loggerSpy).toBeCalledTimes(2);
        done();
      },
    });
  });
});
