import {
  IsString,
  IsEnum,
  IsNumber,
  Min,
  IsOptional,
  Max,
} from 'class-validator';
import { ProductCategory } from '../products.entity';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  available_units: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  sale_percentage?: number;
}
