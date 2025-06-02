import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './products/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Product],
      synchronize: true,
    }),
    ProductsModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
