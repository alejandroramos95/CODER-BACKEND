import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartInterface } from './Interface/cart.interface';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    async getAllCarts(): Promise<CartInterface[]> {
        return await this.cartService.getCarts();
    }

    @Get(':id')
    async getById(@Param('id') cartId: string): Promise<CartInterface> {
        return await this.cartService.getCartById(cartId);
    }

    @Post('/user/:id')
    async createCart(@Param('id') userId: string): Promise<CartInterface> {
        return await this.cartService.createCart(userId);
    }

    @Post('/user/:userId/product/:prodId')
    async addProductToCart(
        @Param('userId') userId: string,
        @Param('prodId') productId: string,
    ): Promise<CartInterface> {
        return await this.cartService.addProduct(userId, productId);
    }

    @Delete(':id')
    async deleteById(@Param('id') cartId: string): Promise<CartInterface> {
        return await this.cartService.deleteById(cartId);
    }
}
