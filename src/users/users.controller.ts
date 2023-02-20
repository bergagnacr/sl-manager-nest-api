import { Controller, Get } from '@nestjs/common';
import { User } from './types';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  listAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
