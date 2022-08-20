import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(data): Promise<Product> {
    return this.productRepository.save(data);
  }

  async show(id: string): Promise<Product> {
    return this.productRepository.findOneBy({ id: id });
  }

  async update(id: string, data): Promise<Product> {
    await this.productRepository.update(id, data);
    const product = await this.productRepository.findOneBy({ id: id });
    return product;
  }

  async delete(id: string): Promise<any> {
    return this.productRepository.delete({ id: id });
  }
}
