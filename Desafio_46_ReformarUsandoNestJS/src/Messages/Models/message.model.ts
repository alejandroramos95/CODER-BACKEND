import { model, Schema, Types } from 'mongoose';

const messageSchema = new Schema({
    message: { type: String, required: true },
    from: { type: Types.ObjectId, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
});

export const MessageModel = model('mensajes', messageSchema);
