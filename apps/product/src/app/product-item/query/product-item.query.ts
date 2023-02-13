import { IsEnum, IsIn, IsNumber, IsOptional, IsString} from 'class-validator';
import { Transform } from 'class-transformer';
import { SortDirection } from '../product-item.enum';
import { PostPagination, SortByType} from '../product-item.enum';

export class ProductItemQuery {
  @Transform(({value})=> +value || PostPagination.DefaultCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = PostPagination.DefaultCountLimit;

  @Transform(({value}) => +value)
  @IsOptional()
  public page = PostPagination.DefaultPageCount;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = SortDirection.Default;


  @IsString()
  @IsOptional()
  public userId?: string;

  @IsOptional()
  @IsEnum(SortByType)
  public sortBy?: SortByType.Date | SortByType.Likes | SortByType.Comments = SortByType.Date;

  @IsString()
  @IsOptional()
  public tag?: string;

}

