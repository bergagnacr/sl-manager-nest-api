import { AuthService } from './auth.service';
import { AuthLoginUserDto } from './dto/authLoginUserDto';
import { AuthRegisterUserDto } from './dto/authRegisterUserDto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(authRegisterUserDto: AuthRegisterUserDto): Promise<unknown>;
    login(authLoginUserDto: AuthLoginUserDto): Promise<unknown>;
}
