import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(newProduct);
  }

  async findAll() {
    const allProducts = await this.productsRepository.find();
    return allProducts;
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOneBy({ id });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.productsRepository.update(
      id,
      updateProductDto,
    );
    return updateProduct;
  }

  async remove(id: number) {
    return await this.productsRepository.delete({ id });
  }
}
