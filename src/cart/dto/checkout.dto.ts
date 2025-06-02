import { IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

class CheckoutItem {
  @IsInt({ message: 'O ID do produto deve ser um número inteiro.' })
  @Min(1, { message: 'O ID do produto deve ser maior que zero.' })
  productId: number;

  @IsInt({ message: 'A quantidade deve ser um número inteiro.' })
  @Min(1, { message: 'A quantidade mínima para compra é 1.' })
  quantity: number;
}

export class CheckoutDto {
  @IsArray({ message: 'A lista de itens deve ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => CheckoutItem)
  items: CheckoutItem[];
}
