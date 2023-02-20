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
exports.AuthLoginUserDto = void 0;
const class_validator_1 = require("class-validator");
const config_1 = require("./config");
class AuthLoginUserDto {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthLoginUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Matches)(config_1.MATCHING_PASS_REGEX, { message: 'invalid password' }),
    __metadata("design:type", String)
], AuthLoginUserDto.prototype, "password", void 0);
exports.AuthLoginUserDto = AuthLoginUserDto;
//# sourceMappingURL=authLoginUserDto.js.map