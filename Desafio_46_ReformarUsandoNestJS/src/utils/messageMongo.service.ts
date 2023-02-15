import { Injectable } from '@nestjs/common';
import mongoose, { connect } from 'mongoose';
import { MessageDTO } from 'src/Messages/DTO/message.dto';
import { MessageModel } from 'src/Messages/Models/message.model';

mongoose.set('strictQuery', true);

@Injectable()
export class MessageMongo {
    private mongodb;
    private url: string;
    constructor() {
        this.url = process.env.MONGODB_URI;
        this.mongodb = connect;
    }

    // Crear Archivo con el producto
    async newMessage(message: MessageDTO) {
        try {
            await this.mongodb(this.url);
            const newMessage = new MessageModel(message);
            await newMessage.save();
            console.log(`newMensaje ${newMessage}`);
            return newMessage;
        } catch (err) {
            console.log(err);
        }
    }

    // Obtener todos los productos
    async getAll(): Promise<MessageDTO[]> {
        try {
            console.log('leyendo mensajes en mongo');
            await this.mongodb(this.url);
            return await MessageModel.find();
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
            return await MessageModel.findByIdAndDelete(productId);
        } catch (err) {
            throw { error: 'No existen productos' };
        }
    }
}
