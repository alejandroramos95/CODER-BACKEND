import { Injectable } from '@nestjs/common';
import { CartMongo } from 'src/utils/cartMongo.service';
import { CartDTO } from './DTO/cart.dto';

@Injectable()
export class CartService {
    constructor(private readonly cartMongo: CartMongo) {}

    async getCarts(): Promise<CartDTO[]> {
        return await this.cartMongo.getCarts();
    }

    async getCartById(id: string): Promise<CartDTO> {
        return await this.cartMongo.getCartById(id);
    }

    async createCart(userId: string): Promise<CartDTO> {
        return await this.cartMongo.createCart(userId);
    }

    async addProduct(userId: string, IdProd: string): Promise<CartDTO> {
        return await this.cartMongo.addProduct(userId, IdProd);
    }

    async deleteById(id: string): Promise<CartDTO> {
        return await this.cartMongo.deleteById(id);
    }
}
