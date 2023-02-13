import {ApiProperty} from '@nestjs/swagger';
import { Comment, GuitarType } from '@prisma/client'
import {Expose} from 'class-transformer';
import { IsArray } from 'class-validator';


export class CreatedProductRdo {
  @ApiProperty({
    description: 'UserId'
  })
  @Expose()
  public userId:  string;

  @Expose()
  @ApiProperty({
    description: 'productType',
    example: "{}",
  })
  public productType: string;

  @Expose()
  @ApiProperty({
    description: 'The type of guitar',
    default: false
  })
  public guitarType: GuitarType;

  @Expose()
  @ApiProperty({
    description: 'photo',
    example: "{}",
  })
  public photo: string;

  @Expose()
  @ApiProperty({
    description: 'Quantity of strings',
    example: "{}",
  })
  public chordQty: number;

  @Expose()
  @ApiProperty({
    description: 'price',
    example: "{}",
  })
  public price: number;

  @Expose()
  @ApiProperty({
    description: 'title',
    example: "{}",
  })
  public title: string;

  @Expose()
  @ApiProperty({
    description: 'description',
    example: "{}",
  })
  public description: string;


  @Expose()
  @ApiProperty({
    description: 'sku',
    example: "{}",
  })
  public sku: string;

  @Expose()
  public comments: Comment[]


  @Expose()
  @ApiProperty({
    description: 'sku',
    example: "{}",
  })
  @IsArray()
  public orders: number[];

}
