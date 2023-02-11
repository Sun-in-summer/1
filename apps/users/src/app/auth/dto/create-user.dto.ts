import {ApiProperty} from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsString, IsNotEmpty , MinLength, MaxLength, IsOptional, IsBoolean} from 'class-validator';
import { AuthError } from '../auth.enum';
export class CreateUserDto {
  @ApiProperty({
    description: 'The unique email of user',
    required: true,
    example: 'keks@htmlacademy.ru'
  })
  @IsNotEmpty()
  @IsEmail(
    {},
    {message: AuthError.UserEmailNotValid}
  )
  public email: string;

  @ApiProperty({
    description: " User's birth date",
    example: "1984-09-05"
  })
  @IsISO8601({
    message: AuthError.UserBirthdateNotValid
  })
  public birthDate: Date;

  @ApiProperty({
    description: "User's first name",
    example: "Peter"
  })
  @IsString()
  @MinLength(3, {message: 'firstname must be at least 3 symbols'})
  @MaxLength(50, {message: 'firstname must be max 50 symbols'})
  public firstname: string;

  @ApiProperty({
    description: "User's lastname",
    example: "Smith"
    })
  @IsString()
  @MinLength(3, {message: 'firstname must be at least 3 symbols'})
  @MaxLength(50, {message: 'firstname must be max 50 symbols'})
  public lastname: string;

  @ApiProperty({
    description: "User's password",
    example: "987654"
  })
  @IsString()
  @MinLength(6, {message: 'firstname must be at least 6 symbols'})
  @MaxLength(12, {message: 'firstname must be max 12 symbols'})
  public password: string;

  @ApiProperty({
    description: 'Avatar image file name',
    example: "avatar.jpg"
  })
  @IsOptional()
  public avatar: string;


  @ApiProperty({
    description: "Subscriber's status",
    example: "false",
    required: true,
    default: true
  })
  @IsBoolean()
  public isSubscribed: boolean;

}
