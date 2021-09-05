import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  birthDate: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  isPhoneNumberVerified: boolean;

  @IsNotEmpty()
  country: string;
}
