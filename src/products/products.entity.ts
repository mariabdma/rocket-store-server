import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ProductCategory {
  CLOTHING = 'clothing',
  ACCESSORIES = 'accessories',
  BEAUTY = 'beauty',
  ELECTRONICS = 'electronics',
  SPORTS = 'sports',
  BOOKS = 'books',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', enum: ProductCategory })
  category: ProductCategory;

  @Column()
  description: string;

  @Column({ default: 0 })
  available_units: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  sale_percentage: number;
}
