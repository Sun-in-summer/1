import { Entity } from '@guitar/core';
import {Comment, GuitarType,  Product} from '@guitar/shared-types';


export class ProductItemEntity implements Entity<ProductItemEntity>, Product {
  public id?:            number;
  public userId:         string;
  public commentsCount:  number;
  public comments?:      Comment[];
  public lastEditTime?:  Date;
  public productType:    string
  public guitarType :    GuitarType;
  public photo:          string;
  public chordQty:       number;
  public price:          number;
  public rating:         number;
  public title :         string;
  public description :   string;
  public sku:            string;



 constructor (productItem: Product) {
    this.fillEntity(productItem);
  }

  public toObject() {
    return {
      ...this,
    }
  }



  public fillEntity(productItem: Product) :void {
    this.id =productItem.id,
    this.userId =productItem.userId,
    this.commentsCount= productItem.commentsCount,
    this.comments={...productItem.comments},
    this.lastEditTime= new Date(),
    this.productType= productItem.productType,
    this.guitarType = productItem.guitarType,
    this.photo = productItem.photo,
    this.chordQty = productItem.chordQty,
    this.price = productItem.price,
    this.rating = productItem.rating,
    this.title  = productItem.title,
    this.description  = productItem.description,
    this.sku = productItem.sku
  }
}
