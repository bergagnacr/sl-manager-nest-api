import { AuthLoginUserDto } from './dto/authLoginUserDto';
import { AuthRegisterUserDto } from './dto/authRegisterUserDto';
export declare class AuthService {
    private userPool;
    constructor();
    registerUser(authRegisterUserDto: AuthRegisterUserDto): Promise<unknown>;
    authenticateUser(authLoginUserDto: AuthLoginUserDto): Promise<unknown>;
}
