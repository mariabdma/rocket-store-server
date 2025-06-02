import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../products/products.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('CartService', () => {
  let service: CartService;
  let repo: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should checkout products and update stock', async () => {
    const product = {
      id: 1,
      name: 'Tênis',
      available_units: 5,
    } as Product;

    const checkoutDto = {
      items: [{ productId: 1, quantity: 2 }],
    };

    jest.spyOn(repo, 'findOneBy').mockResolvedValue(product);
    jest.spyOn(repo, 'save').mockResolvedValue({
      ...product,
      available_units: 3,
    });

    const result = await service.checkout(checkoutDto);

    expect(result.message).toBe('Compra finalizada com sucesso.');
    expect(result.summary).toEqual([
      { productId: 1, name: 'Tênis', remaining: 3 },
    ]);
  });

  it('should throw if product not found', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);

    await expect(
      service.checkout({ items: [{ productId: 999, quantity: 1 }] }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw if stock is insufficient', async () => {
    const product = {
      id: 2,
      name: 'Mochila',
      available_units: 1,
    } as Product;

    jest.spyOn(repo, 'findOneBy').mockResolvedValue(product);

    await expect(
      service.checkout({ items: [{ productId: 2, quantity: 5 }] }),
    ).rejects.toThrow(BadRequestException);
  });
});
