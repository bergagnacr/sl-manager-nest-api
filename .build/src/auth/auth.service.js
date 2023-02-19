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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
let AuthService = class AuthService {
    constructor() {
        this.userPool = new amazon_cognito_identity_js_1.CognitoUserPool({
            UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
            ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        });
    }
    async registerUser(authRegisterUserDto) {
        const { name, email, password } = authRegisterUserDto;
        return new Promise((resolve, reject) => {
            this.userPool.signUp(email, password, [new amazon_cognito_identity_js_1.CognitoUserAttribute({ Name: 'name', Value: name })], null, (err, result) => {
                if (!result) {
                    reject(err);
                }
                else {
                    resolve(result.user);
                }
            });
        });
    }
    async authenticateUser(authLoginUserDto) {
        const { email, password } = authLoginUserDto;
        const userData = {
            Username: email,
            Pool: this.userPool,
        };
        const authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails({
            Username: email,
            Password: password,
        });
        const userCognito = new amazon_cognito_identity_js_1.CognitoUser(userData);
        return new Promise((resolve, reject) => {
            userCognito.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    resolve({
                        accessToken: result.getAccessToken().getJwtToken(),
                        refreshToken: result.getRefreshToken().getToken(),
                    });
                },
                onFailure: (err) => {
                    reject(err);
                },
            });
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map