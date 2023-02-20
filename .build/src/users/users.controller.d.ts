import { User } from './types';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    listAllUsers(): Promise<User[]>;
}
