import { AuthChangePasswordUserDto } from './dto/authChangePasswordUserDto';
import { AuthConfirmPasswordUserDto } from './dto/authConfirmPasswordUserDto';
import { AuthForgotPasswordUserDto } from './dto/authForgotPasswordUserDto';
import { AuthLoginUserDto } from './dto/authLoginUserDto';
import { AuthRegisterUserDto } from './dto/authRegisterUserDto';
export declare class AuthService {
    private userPool;
    constructor();
    registerUser(authRegisterUserDto: AuthRegisterUserDto): Promise<unknown>;
    authenticateUser(authLoginUserDto: AuthLoginUserDto): Promise<unknown>;
    changeUserPassword(authChangePasswordUserDto: AuthChangePasswordUserDto): Promise<unknown>;
    forgotUserPassword(authForgotPasswordUserDto: AuthForgotPasswordUserDto): Promise<unknown>;
    confirmUserPassword(authConfirmPasswordUserDto: AuthConfirmPasswordUserDto): Promise<unknown>;
}
