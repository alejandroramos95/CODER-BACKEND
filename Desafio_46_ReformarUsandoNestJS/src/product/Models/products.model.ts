import { model, Schema } from 'mongoose';

const productSchema = new Schema({
    full_title: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
});

export const ProductModel = model('productos', productSchema);
