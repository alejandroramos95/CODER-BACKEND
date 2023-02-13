import { Types } from 'mongoose';

export interface CartInterface {
    products: Array<JSON>;
    timestamp: Date;
    _id: Types.ObjectId;
}
