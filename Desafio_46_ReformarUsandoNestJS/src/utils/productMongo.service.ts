import { Injectable } from '@nestjs/common';
import mongoose, { connect } from 'mongoose';
import { ProductDTO } from 'src/product/dto/product.dto';
import { ProductModel } from 'src/product/models/products.model';
mongoose.set('strictQuery', true);

@Injectable()
export class ProductMongo {
    private mongodb;
    private url: string;
    constructor() {
        this.url = process.env.MONGODB_URI;
        this.mongodb = connect;
    }

    // Crear Archivo con el producto
    async createProduct(prod: ProductDTO) {
        try {
            await this.mongodb(this.url);
            const newProduct = new ProductModel(prod);
            await newProduct.save();
            console.log(`newProduct ${newProduct}`);
            return newProduct;
        } catch (err) {
            console.log(err);
        }
    }

    // Obtener producto por Id
    async getById(id: string) {
        try {
            console.log(id);
            await this.mongodb(this.url);
            const productId = new mongoose.Types.ObjectId(id);
            return await ProductModel.findById(productId);
        } catch (error) {
            console.log(error);
            throw { error: 'Producto no existe' };
        }
    }

    // Obtener todos los productos
    async getAll() {
        try {
            console.log('leyendo productos en mongo');
            await this.mongodb(this.url);
            return await ProductModel.find();
        } catch (err) {
            console.log(err);
            throw { error: 'No existen productos' };
        }
    }

    // Borrar un producto
    async deleteById(id: string) {
        try {
            await this.mongodb(this.url);
            const productId = new mongoose.Types.ObjectId(id);
            return await ProductModel.findByIdAndDelete(productId);
        } catch (err) {
            throw { error: 'No existen productos' };
        }
    }
}
