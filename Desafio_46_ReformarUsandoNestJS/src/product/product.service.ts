import { Injectable } from '@nestjs/common';
import { ProductMongo } from 'src/utils/productMongo.service';
import { ProductInterface } from './Interface/product.interface';

@Injectable()
export class ProductService {
    constructor(private readonly productMongo: ProductMongo) {}

    async getAll(): Promise<ProductInterface[]> {
        return await this.productMongo.getAll();
    }

    async getById(id: string): Promise<ProductInterface> {
        return await this.productMongo.getById(id);
    }

    async createProduct(product: ProductInterface): Promise<ProductInterface> {
        return await this.productMongo.createProduct(product);
    }

    async deleteById(id: string): Promise<ProductInterface> {
        return await this.productMongo.deleteById(id);
    }
}
