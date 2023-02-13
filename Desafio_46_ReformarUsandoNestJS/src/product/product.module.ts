import { Module } from '@nestjs/common';
import { ProductMongo } from 'src/utils/productMongo.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    providers: [ProductService, ProductMongo],
    controllers: [ProductController],
})
export class ProductModule {}
