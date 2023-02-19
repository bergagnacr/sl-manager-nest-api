import { Controller, Get } from '@nestjs/common';
import { User } from './users/types';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { LocalAuthGuard } from './auth/local-auth.guard';
// import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private userService: UsersService) {}

  //   @UseGuards(LocalAuthGuard)
  //   @Post('auth/login')
  //   async login(@Request() req) {
  //     return this.authService.login(req.user);
  //   }

  //   @UseGuards(JwtAuthGuard)
  //   @Get('profile')
  //   getProfile(@Request() req) {
  //     return req.user;
  //   }

  @Get('users')
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
