import { Types } from 'mongoose';
import {
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    IsUrl,
} from 'class-validator';

export class ProductDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    stock: number;

    @IsUrl()
    thumbnail: string;

    _id: Types.ObjectId;
}
