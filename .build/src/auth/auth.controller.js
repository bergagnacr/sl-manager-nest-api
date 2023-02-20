"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const authChangePasswordUserDto_1 = require("./dto/authChangePasswordUserDto");
const authConfirmPasswordUserDto_1 = require("./dto/authConfirmPasswordUserDto");
const authForgotPasswordUserDto_1 = require("./dto/authForgotPasswordUserDto");
const authLoginUserDto_1 = require("./dto/authLoginUserDto");
const authRegisterUserDto_1 = require("./dto/authRegisterUserDto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(authRegisterUserDto) {
        return await this.authService.registerUser(authRegisterUserDto);
    }
    async login(authLoginUserDto) {
        return await this.authService.authenticateUser(authLoginUserDto);
    }
    async changePassword(authChangePasswordUserDto) {
        return await this.authService.changeUserPassword(authChangePasswordUserDto);
    }
    async forgotPassword(authForgotPasswordUserDto) {
        return await this.authService.forgotUserPassword(authForgotPasswordUserDto);
    }
    async confirmPassword(authConfirmPasswordUserDto) {
        return await this.authService.confirmUserPassword(authConfirmPasswordUserDto);
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authRegisterUserDto_1.AuthRegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authLoginUserDto_1.AuthLoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/change-password'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authChangePasswordUserDto_1.AuthChangePasswordUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('/forgot-password'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authForgotPasswordUserDto_1.AuthForgotPasswordUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('/confirm-password'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authConfirmPasswordUserDto_1.AuthConfirmPasswordUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmPassword", null);
AuthController = __decorate([
    (0, common_1.Controller)('/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map