import { Comment } from './comment.interface';




export type GuitarType = 'Acoustic' | 'Electric' | 'Ukulele'

export interface Product {
  id?:            number;
  userId:         string;
  commentsCount:  number;
  comments?:      Comment[];
  lastEditTime?:  Date;
  productType:    string
  guitarType :    GuitarType;
  photo:          string;
  chordQty:       number;
  price:          number;
  rating:         number;
  title :         string;
  description :   string;
  sku:            string;

}



