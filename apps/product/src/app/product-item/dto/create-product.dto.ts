import { GuitarType } from '@guitar/shared-types';
import {ApiProperty} from '@nestjs/swagger';
// import { Transform } from 'class-transformer';
import {  IsOptional,  IsMongoId,   IsString,  IsNumber} from 'class-validator';


export class CreateProductDto {

  @ApiProperty({
    description: 'UserId'
  })
  @IsOptional()
  @IsMongoId()
  public userId:  string;


  @ApiProperty({
    description: 'productType',
    example: "{}",
    required: true
  })
  @IsOptional()
  public productType: string;

  @ApiProperty({
    description: 'The type of guitar',
    required: true,
    default: false
  })
  public guitarType: GuitarType;

  @ApiProperty({
    description: 'photo',
    example: "{}",
  })
  @IsOptional()
  public photo: string;

  @ApiProperty({
    description: 'Quantity of strings',
    example: "{}",
    required: true
  })
  public chordQty: number;

   @ApiProperty({
    description: 'price',
    example: "{}",
    required: true
  })
  @IsNumber()
  public price: number;


  @ApiProperty({
    description: 'title',
    example: "{}",
    required: true
  })
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'description',
    example: "{}",
    required: true
  })
  @IsOptional()
  public description: string;

  @ApiProperty({
    description: 'sku',
    example: "{}",
    required: true
  })
  @IsOptional()
  public sku: string;

  @ApiProperty({
    description: 'id',
    example: "{}",
  })
  @IsOptional()
  public id?: number;


}



