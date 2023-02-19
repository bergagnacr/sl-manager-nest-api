import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  returnHello() {
    console.log('hola puto');
    return 'Hello';
  }
}
