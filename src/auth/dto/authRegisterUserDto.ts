import { IsEmail, IsString, Matches } from 'class-validator';
import { MATCHING_PASS_REGEX } from './config';

export class AuthRegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  /* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character */

  @Matches(MATCHING_PASS_REGEX, { message: 'invalid password' })
  password: string;
}
