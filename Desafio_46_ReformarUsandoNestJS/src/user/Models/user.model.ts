import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    avatar: { type: String, required: true },
    cartId: { type: Schema.Types.ObjectId, ref: 'carts' },
});

export const UserModel = model('usuarios', userSchema);
