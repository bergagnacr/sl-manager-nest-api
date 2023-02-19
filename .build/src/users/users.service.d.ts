import { User } from './types';
export declare class UsersService {
    private readonly users;
    findOne(name: string): Promise<User | undefined>;
    findAll: () => Promise<User[]>;
}
