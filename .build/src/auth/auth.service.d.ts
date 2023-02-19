import { AuthLoginUserDto } from './dtos/authLoginUserDto';
import { AuthRegisterUserDto } from './dtos/authRegisterUserDto';
export declare class AuthService {
    private userPool;
    constructor();
    registerUser(authRegisterUserDto: AuthRegisterUserDto): Promise<unknown>;
    authenticateUser(authLoginUserDto: AuthLoginUserDto): Promise<unknown>;
}
