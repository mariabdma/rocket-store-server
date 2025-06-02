import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
