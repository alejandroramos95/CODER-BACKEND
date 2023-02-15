import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
    Request,
} from '@nestjs/common';
import { AuthenticateGuard } from 'src/auth/authenticated.guard';
import { CartService } from './cart.service';
import { CartInterface } from './Interface/cart.interface';

@Controller('api/cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    async getAllCarts(): Promise<CartInterface[]> {
        return await this.cartService.getCarts();
    }

    @UseGuards(AuthenticateGuard)
    @Get('user')
    async getById(@Request() req): Promise<CartInterface> {
        return await this.cartService.getCartById(req.user._id);
    }

    @Post('/user/:id')
    async createCart(@Param('id') userId: string): Promise<CartInterface> {
        return await this.cartService.createCart(userId);
    }

    @UseGuards(AuthenticateGuard)
    @Post('/product/:prodId')
    async addProductToCart(
        @Request() req,
        @Param('prodId') productId: string,
    ): Promise<CartInterface> {
        return await this.cartService.addProduct(req.user._id, productId);
    }

    @UseGuards(AuthenticateGuard)
    @Delete('')
    async deleteById(@Request() req): Promise<CartInterface> {
        return await this.cartService.deleteById(req.user._id);
    }
}
