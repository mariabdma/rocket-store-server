import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(data: CreateProductDto) {
    const product = this.productRepository.create(data); // mapeia dto → entidade
    return await this.productRepository.save(product);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: number, data: UpdateProductDto) {
    await this.productRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.productRepository.delete(id);
  }
}
