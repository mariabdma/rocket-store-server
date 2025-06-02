import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../products.entity';
import { Repository } from 'typeorm';
import { ProductCategory } from '../products.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const createDto = {
      name: 'Tênis',
      category: ProductCategory.CLOTHING,
      description: 'Tênis confortável',
      available_units: 10,
      price: 199.9,
    };

    const savedProduct = { id: 1, ...createDto };

    jest.spyOn(repo, 'create').mockReturnValue(savedProduct as Product);
    jest.spyOn(repo, 'save').mockResolvedValue(savedProduct as Product);

    const result = await service.create(createDto);
    expect(result).toEqual(savedProduct);
  });
});
