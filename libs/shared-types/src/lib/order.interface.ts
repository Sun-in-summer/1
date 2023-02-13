import { Product } from './product.interface';


export interface Order {
  id?:            number;
  products?:       Product[];
  userId?:         string;
}



