import { Injectable , Inject, NotFoundException} from '@nestjs/common';
import { CommandEvent, Product } from '@guitar/shared-types';
import { ProductItemRepository } from './product-item.repository';
import { ProductItemEntity } from '../product-item/product-item.entity';
import {  CreateProductDto } from './dto/create-product.dto';
import * as dayjs from 'dayjs';
import { ProductItemQuery } from './query/product-item.query';
import {RABBITMQ_SERVICE} from './product-item.constant';
import {ClientProxy} from '@nestjs/microservices';
import { ProductError } from './product-item.enum';
import { validateProductUserId } from '@guitar/core';




@Injectable()
export class ProductItemService {

  constructor (
    private readonly productItemRepository: ProductItemRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ){}

  async create(dto: CreateProductDto, userId: string): Promise<Product> {

    const productEntity = new ProductItemEntity(
      {
      ...dto,
      userId: userId,
      lastEditTime: dayjs(new Date()).toDate(),
      commentsCount: 0,
      comments: [],
      rating: 0,

    });


    return this.productItemRepository.create(productEntity);

  }

  async update (userId: string, productId: number, dto: CreateProductDto ): Promise <Product> {
     const existProduct = await this.productItemRepository.findById(productId);

     if (!existProduct){
      throw new NotFoundException(ProductError.NotFound);
     }

     validateProductUserId(existProduct, userId);

     const updatedData = new ProductItemEntity({...existProduct, ...dto, lastEditTime: new Date});

     return await this.productItemRepository.update(productId, updatedData);

  }

  async delete(userId: string, productId: number) {
    const existProduct = await this.productItemRepository.findById(productId);
    validateProductUserId(existProduct, userId);
    return await this.productItemRepository.destroy(productId)
  }

  async getProducts(query: ProductItemQuery): Promise <Product[]>{
    return await this.productItemRepository.find(query)
  }

  async getProduct(productId: number): Promise <Product> {
    const product =  await this.productItemRepository.findById(productId);
    return product;

  }



  async notify(email: string ): Promise<void> {

    const newProducts = await this.productItemRepository.findNewProducts() ;
    const productsIds = newProducts.map((product) => product.id);

    this.rabbitClient.emit(
      {
        cmd: CommandEvent.AddProducts
      },
      {
        email: email,
        productIds: productsIds //заменить после отладки
      }
    );


  }

}
