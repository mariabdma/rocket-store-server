import { Controller, Post, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('checkout')
  checkout(@Body() dto: CheckoutDto) {
    return this.cartService.checkout(dto);
  }
}
