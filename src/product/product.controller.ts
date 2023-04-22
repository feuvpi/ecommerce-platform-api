import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(AuthGuard(), AdminGuard)
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard(), AdminGuard)
  async create(@Body() product: Product): Promise<Product> {
    return await this.productService.create(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return await this.productService.update(id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async delete(@Param('id') id: string): Promise<Product> {
    return await this.productService.delete(id);
  }
}
