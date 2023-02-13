import { Types } from 'mongoose';
import { IsArray, IsDate, IsMongoId } from 'class-validator';

export class CartDTO {
    @IsArray()
    products: Array<JSON>;

    @IsDate()
    timestamp: Date;

    @IsMongoId()
    _id: Types.ObjectId;
}
