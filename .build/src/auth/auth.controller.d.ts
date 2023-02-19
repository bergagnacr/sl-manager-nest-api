import { AuthService } from './auth.service';
import { AuthLoginUserDto } from './dtos/authLoginUserDto';
import { AuthRegisterUserDto } from './dtos/authRegisterUserDto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(authRegisterUserDto: AuthRegisterUserDto): Promise<unknown>;
    login(authLoginUserDto: AuthLoginUserDto): Promise<unknown>;
}
