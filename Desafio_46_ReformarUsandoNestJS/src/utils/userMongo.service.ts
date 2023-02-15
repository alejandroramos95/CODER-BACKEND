import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserModel } from 'src/user/models/user.model';

@Injectable()
export class UserMongo {
    private mongodb;
    private url: string;
    constructor() {
        this.url = process.env.MONGODB_URI;
        this.mongodb = mongoose.connect;
    }

    // Crear Archivo con el producto
    async createUser(user: UserDTO) {
        try {
            await this.mongodb(this.url);
            const doc = await UserModel.findOne({ email: user.email });
            if (doc) {
                throw { error: 'El usuario ya existe' };
            }
            const newUser = new UserModel(user);
            await newUser.save();
            console.log(`newUser ${newUser}`);
            return newUser;
        } catch (err) {
            console.log(err);
        }
    }

    // Obtener producto por Id
    async getById(id: string) {
        try {
            await this.mongodb(this.url);
            const UserId = new mongoose.Types.ObjectId(id);
            return await UserModel.findById(UserId);
        } catch (error) {
            console.log(error);
            throw { error: 'Producto no existe' };
        }
    }

    async findUser(email: string) {
        try {
            await this.mongodb(this.url);
            return await UserModel.findOne({ email: email }).lean();
        } catch (error) {
            console.log(error);
            throw { error: 'Producto no existe' };
        }
    }

    // Obtener todos los productos
    async getAll() {
        try {
            console.log('leyendo usuarios en mongoDB');
            await this.mongodb(this.url);
            return await UserModel.find();
        } catch (err) {
            console.log(err);
            throw { error: 'No existen usuarios' };
        }
    }

    // Borrar un producto
    async deleteById(id: string) {
        try {
            await this.mongodb(this.url);
            const usuarioId = new mongoose.Types.ObjectId(id);
            return await UserModel.findByIdAndDelete(usuarioId);
        } catch (err) {
            throw { error: 'No existe usuario' };
        }
    }
}
