import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async all() {
    return this.productService.all();
  }

  @Post()
  async create(@Body('title') title: string, @Body('image') image: string) {
    const product = await this.productService.create({
      title,
      image,
    });

    this.client.emit('product_created', product);

    return product;
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return this.productService.show(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('image') image: string,
  ) {
    const product = await this.productService.update(id, {
      title,
      image,
    });

    this.client.emit('product_updated', product);

    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.productService.delete(id);

    this.client.emit('product_deleted', id);
    return {
      message: 'product deleted',
      id,
    };
  }

  @Post(':id/like')
  async like(@Param('id') id: string) {
    const product = await this.productService.show(id);
    return this.productService.update(id, {
      likes: product.likes + 1,
    });
  }
}
