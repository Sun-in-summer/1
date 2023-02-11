import {Expose, Transform} from 'class-transformer';
import {ApiProperty } from '@nestjs/swagger';

export class  UserRdo {
  @ApiProperty({
    description: "Unigue user's ID",
    example: "12"
  })
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: "User's avatar",
    example: "/images/avatar.jpg"
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: "User's firstname",
    example: "Peter"
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: "User's lastname",
    example: "Smith"
  })
  @Expose()
  public lastname: string;

  @ApiProperty({
    description: "User's unique email",
    example: "user@user.com"
  })
  @Expose()
  public email:  string;

  @ApiProperty({
    description: "User's birth date",
    example: "1984-09-05"
  })
  @Expose()
  public birthDate: Date; ////
}
