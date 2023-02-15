import { Types } from 'mongoose';
import {
    IsDataURI,
    IsDateString,
    IsNotEmpty,
    IsNumberString,
    IsString,
    IsUrl,
} from 'class-validator';

export class ProductDTO {
    @IsString()
    @IsNotEmpty()
    full_title: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumberString()
    price: number;

    @IsNumberString()
    stock: number;

    @IsUrl()
    thumbnail: string;

    _id: Types.ObjectId;
}
