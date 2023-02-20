import { IsEmail, Matches } from 'class-validator';
import { MATCHING_PASS_REGEX } from './config';

export class AuthLoginUserDto {
  @IsEmail()
  email: string;

  @Matches(MATCHING_PASS_REGEX, { message: 'invalid password' })
  password: string;
}
