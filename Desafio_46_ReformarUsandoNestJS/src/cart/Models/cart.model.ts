import { model, Schema } from 'mongoose';

const cartSchema = new Schema({
    products: { type: Array, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const CartModel = model('carritos', cartSchema);
