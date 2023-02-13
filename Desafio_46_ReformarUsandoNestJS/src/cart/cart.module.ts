import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartMongo } from 'src/utils/cartMongo.service';

@Module({
  providers: [CartService, CartMongo],
  controllers: [CartController]
})
export class CartModule {}
