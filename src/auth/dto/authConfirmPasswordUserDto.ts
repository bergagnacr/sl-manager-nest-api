import { IsEmail, IsString, Matches } from 'class-validator';
import { MATCHING_PASS_REGEX } from './config';

export class AuthConfirmPasswordUserDto {
  @IsEmail()
  email: string;

  @IsString()
  confirmationCode: string;

  @Matches(MATCHING_PASS_REGEX, { message: 'invalid password' })
  newPassword: string;
}
