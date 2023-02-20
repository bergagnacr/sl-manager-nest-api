import { IsEmail, Matches } from 'class-validator';
import { MATCHING_PASS_REGEX } from './config';

export class AuthChangePasswordUserDto {
  @IsEmail()
  email: string;

  @Matches(MATCHING_PASS_REGEX, { message: 'invalid Password' })
  currentPassword: string;

  @Matches(MATCHING_PASS_REGEX, { message: 'invalid Password' })
  newPassword: string;
}
