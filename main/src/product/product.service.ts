import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(data): Promise<Product> {
    return new this.productModel(data).save();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findOne({ id });
  }

  async update(id: string, data: any): Promise<any> {
    return this.productModel.findOneAndUpdate({ id }, data);
  }

  async delete(id: string): Promise<void> {
    this.productModel.deleteOne({ id });
  }
}
