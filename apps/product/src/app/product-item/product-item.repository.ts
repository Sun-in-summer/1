import { CRUDRepository } from '@guitar/core';
import { ProductItemEntity } from './product-item.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductItemQuery } from './query/product-item.query';
import { ProductError, SortByType } from './product-item.enum';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@guitar/shared-types';


@Injectable()
export class ProductItemRepository implements CRUDRepository<ProductItemEntity, number, Product> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: ProductItemEntity): Promise<Product> {
     const entityData = item.toObject();

     const product = await this.prisma.product.create({
      data: {
        ...entityData,

        comments: {
          connect: []
        },
      },
      include: {
        comments: true,
      }
    });

     return product;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id,
      }
    });
  }

  public  async findById(id: number): Promise< Product | null > {


    const product =  await this.prisma.product.findFirst({
      where: {
        id,
      },
      include: {
        comments: true,
      }
    });

    if (!product) {
      throw new NotFoundException(ProductError.NotFound);
    }


    return {...product, id: product.id};
  }

  public async find({limit, page, sortDirection, sortBy}: ProductItemQuery): Promise<Product[]> {
    const products =  await this.prisma.product.findMany({
      include: {
        comments: true,
      },
      take: limit,
      orderBy: [
        sortBy === SortByType.Comments
          ? {
            [sortBy] : {
              _count: sortDirection
            }
          }
          : {
            [sortBy] : sortDirection
          }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });

    return products;
  }

  public async update(id: number, item: ProductItemEntity): Promise<Product> {
    const data = item.toObject();


     return  await  this.prisma.product.update({
       where: {
        id
      },
      data: {
        ...data,
        comments: {
          connect: []
        }
      },  include: {
        comments: true,
        }
     });
  }


    public async findNewProducts(): Promise <Product[]>{

    const foundProducts = await this.prisma.product.findMany({
      take: 2,
    })

    return foundProducts;
  }

}
