import {Expose} from 'class-transformer';
import {ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: "User's email",
    example: "user@mail.com"
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: "Unigue user's ID",
    example: "12"
  })
  @Expose({name: '_id'})
  public id :string;

  @ApiProperty({
    description: "Access token",
    example: "user@user.local"
  })
  @Expose()
  public accessToken: string;

}
