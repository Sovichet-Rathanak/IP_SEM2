import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class createUserDto {
  @IsString({ message: 'User name must be of type string' })
  @MinLength(3, { message: 'User name must have at minimum 3 letters' })
  @IsNotEmpty({message:'User name cannot be empty'})
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({message: "Please enter a password"})
  @MinLength(3, { message: 'Password should have a minimum length of 8 characters' })
  password: string;
}
