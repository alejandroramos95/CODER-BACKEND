import { Types } from 'mongoose';

export interface ProductInterface {
    title: string;
    price: number;
    stock: number;
    thumbnail: string;
    _id: Types.ObjectId;
}
