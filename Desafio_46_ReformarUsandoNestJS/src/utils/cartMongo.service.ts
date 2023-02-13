import { Injectable } from '@nestjs/common';
import mongoose, { Types } from 'mongoose';
import { CartModel } from 'src/cart/Models/cart.model';
import { UserModel } from 'src/user/models/user.model';

@Injectable()
export class CartMongo {
    private mongodb;
    private url: string;
    constructor() {
        this.url = process.env.MONGODB_URI;
        this.mongodb = mongoose.connect;
    }

    async getCarts() {
        try {
            await this.mongodb(this.url);
            return await CartModel.find();
        } catch (err) {
            console.log(err);
        }
    }

    async getCartById(id: string) {
        try {
            await this.mongodb(this.url);
            const cartId = new mongoose.Types.ObjectId(id);
            return await CartModel.findById(cartId);
        } catch (err) {
            console.log(err);
        }
    }

    async createCart(userId: string) {
        try {
            await this.mongodb(this.url);
            const user = await UserModel.findById(
                new mongoose.Types.ObjectId(userId),
            );
            if (!user) {
                throw new Error('User not found');
            } else if (!user.cartId) {
                const newCart = new CartModel();
                await newCart.save();
                user.cartId = newCart._id;
                await user.save();
                return newCart;
            } else {
                return await this.getCartById(user.cartId.toString());
            }
        } catch (err) {
            console.log(err);
            throw { message: err.message };
        }
    }

    async addProduct(userId: string, IdProd: string) {
        try {
            await this.mongodb(this.url);
            const user = await UserModel.findById(
                new mongoose.Types.ObjectId(userId),
            );
            if (!user) {
                throw new Error('User not found');
            }
            if (user.cartId) {
                const cart = await CartModel.findById(user.cartId);
                const index = cart.products.findIndex(
                    (product) => product.productId === IdProd,
                );
                if (index === -1) {
                    cart.products.push({ productId: IdProd, quantity: 1 });
                } else {
                    cart.products[index].quantity += 1;
                }
                await CartModel.findByIdAndUpdate(user.cartId, cart);
                return cart;
            } else {
                this.createCart(userId);
                return await this.addProduct(userId, IdProd);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteCartById(id: Types.ObjectId) {
        try {
            await this.mongodb(this.url);
            return await CartModel.findByIdAndDelete(id);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteRelation(id: Types.ObjectId) {
        try {
            await this.mongodb(this.url);
            const user = await UserModel.findOne({ cartId: id });
            user.cartId = undefined;
            return await user.save();
        } catch (err) {
            console.log(err);
        }
    }

    async deleteById(id: string) {
        try {
            const cartId = new mongoose.Types.ObjectId(id);
            const cart = await this.deleteCartById(cartId);
            await this.deleteRelation(cartId);
            return cart;
        } catch (err) {
            console.log(err);
        }
    }
}
