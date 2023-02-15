import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductDTO } from './DTO/product.dto';
import { ProductInterface } from './Interface/product.interface';
import { ProductService } from './product.service';

@Controller('api/product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts(): Promise<ProductInterface[]> {
        return await this.productService.getAll();
    }

    @Get(':id')
    async getById(@Param() productoId: string): Promise<ProductInterface> {
        return await this.productService.getById(productoId);
    }

    @Post()
    async createProduct(
        @Body() productDTO: ProductDTO,
    ): Promise<ProductInterface> {
        return await this.productService.createProduct(productDTO);
    }

    @Delete(':id')
    async deleteById(@Param() productoId: string): Promise<ProductInterface> {
        return await this.productService.deleteById(productoId);
    }
}
