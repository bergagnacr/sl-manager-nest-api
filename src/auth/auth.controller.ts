import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthLoginUserDto } from './dto/authLoginUserDto';
import { AuthRegisterUserDto } from './dto/authRegisterUserDto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() authRegisterUserDto: AuthRegisterUserDto) {
    return await this.authService.registerUser(authRegisterUserDto);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() authLoginUserDto: AuthLoginUserDto) {
    return await this.authService.authenticateUser(authLoginUserDto);
  }
}
