import { Injectable } from '@nestjs/common';
import { User } from './types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      name: 'john',
      type: 'changeme',
    },
    {
      name: 'maria',
      type: 'guess',
    },
  ];

  async findOne(name: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === name);
  }

  findAll = async (): Promise<User[]> => {
    return this.users;
  };
}
