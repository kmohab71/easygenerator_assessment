import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString()
  password: string;
}

export class RegisterDto {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString()
  // @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: 'Password must contain at least one letter, one number, and one special character',
  })
  password: string;
}