import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { USER_EMAIL_NOT_VALID } from '../product-item.constant';

export class NotifyUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@mail.ru'
  })
  @IsEmail({}, {message: USER_EMAIL_NOT_VALID})
  public email: string;
}
