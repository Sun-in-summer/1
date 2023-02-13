import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail } from 'class-validator';

export class NewPostsDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email of user',
    example: 'example@mail.com'
  })
  public email?: string;

  @IsArray()
  @ApiProperty({
    description: 'New posts ids',
    example: '1, 2, 3'
  })
  public postIds?: string[];

}
