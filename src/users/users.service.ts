import { Injectable } from '@nestjs/common';

// This should be a rea class/interface representing a user entity

export type User = { userId: number; username: string; password: string };

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'pablosarmiento',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'cristiansarmiento',
      password: 'changeme',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
