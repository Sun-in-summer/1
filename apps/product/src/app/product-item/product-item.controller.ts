import { Controller, HttpCode, HttpStatus, Post, Patch, Get, Param, Body, Delete, Query, UseGuards, Req} from '@nestjs/common';
import { ProductItemService } from './product-item.service';
import { ApiBearerAuth, ApiResponse} from '@nestjs/swagger';
import { CreatedProductRdo } from './rdo/created-product.rdo';
import { fillObject } from '@guitar/core';
import { ProductCommentService } from '../product-comment/product-comment.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductItemQuery } from './query/product-item.query';
import { NotifyUserDto } from './dto/notify-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';



@Controller('product')
export class ProductItemController {

  constructor (
    private readonly productItemService: ProductItemService,
    private readonly productCommentService: ProductCommentService
  ){}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  async create( @Body()dto: CreateProductDto, @Req() request ) {
    const {user} =request;
    const {sub} = user;
    const userId = sub;
    const product = await this.productItemService.create(dto, userId);

    return fillObject(CreatedProductRdo, product);
  }

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Products has been found"
  })
  async showAllProducts(@Query () query: ProductItemQuery){
    const products = await this.productItemService.getProducts(query);
    return fillObject(CreatedProductRdo, products)
  }


  @Patch('/:productId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: CreateProductDto,
    status: HttpStatus.OK,
    description: 'Product has been updated'
  })
  async update(
    @Req() request,
    @Param('productId') productId: number,
    @Body() dto: CreateProductDto ) {

    const {user} =request;


    const updatedProduct = await this.productItemService.update(user, productId, dto );

    return fillObject(CreatedProductRdo, updatedProduct);
  }

  @Delete('/:productId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Product has been deleted'
  })
  async delete(@Req() request, @Param('productId') productId: number): Promise <void>{
    const {user} =request;

    await this.productItemService.delete(user, productId);

  }


  @Get('/notify')
  public async notifyUser(@Body() dto: NotifyUserDto) {
    this.productItemService.notify(dto.email);
  }


  @Get('/:productId')
  @ApiResponse({
    type: CreatedProductRdo,
    status: HttpStatus.OK,
    description: "Product has been found"
  })
  async show(@Param('productId') productId: number){
    const existProduct = await this.productItemService.getProduct(productId);
    return fillObject(CreatedProductRdo, existProduct);

  }
}

