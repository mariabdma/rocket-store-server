import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/products.entity';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async checkout({ items }: CheckoutDto): Promise<{
    message: string;
    summary: { productId: number; name: string; remaining: number }[];
  }> {
    const summary: { productId: number; name: string; remaining: number }[] =
      [];

    for (const item of items) {
      const product = await this.productRepository.findOneBy({
        id: item.productId,
      });

      if (!product) {
        throw new NotFoundException(
          `Produto com ID ${item.productId} não encontrado.`,
        );
      }

      if (product.available_units < item.quantity) {
        throw new BadRequestException(
          `Estoque insuficiente para o produto: ${product.name}`,
        );
      }

      product.available_units -= item.quantity;
      await this.productRepository.save(product);

      summary.push({
        productId: product.id,
        name: product.name,
        remaining: product.available_units,
      });
    }

    return {
      message: 'Compra finalizada com sucesso.',
      summary,
    };
  }
}
