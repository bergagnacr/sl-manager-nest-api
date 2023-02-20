import { AuthService } from './auth.service';
import { AuthChangePasswordUserDto } from './dto/authChangePasswordUserDto';
import { AuthConfirmPasswordUserDto } from './dto/authConfirmPasswordUserDto';
import { AuthForgotPasswordUserDto } from './dto/authForgotPasswordUserDto';
import { AuthLoginUserDto } from './dto/authLoginUserDto';
import { AuthRegisterUserDto } from './dto/authRegisterUserDto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(authRegisterUserDto: AuthRegisterUserDto): Promise<unknown>;
    login(authLoginUserDto: AuthLoginUserDto): Promise<unknown>;
    changePassword(authChangePasswordUserDto: AuthChangePasswordUserDto): Promise<unknown>;
    forgotPassword(authForgotPasswordUserDto: AuthForgotPasswordUserDto): Promise<unknown>;
    confirmPassword(authConfirmPasswordUserDto: AuthConfirmPasswordUserDto): Promise<unknown>;
}
