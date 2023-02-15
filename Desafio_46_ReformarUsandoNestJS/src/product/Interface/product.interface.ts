import { Types } from 'mongoose';

export interface ProductInterface {
    full_title: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    thumbnail: string;
    _id: Types.ObjectId;
}
