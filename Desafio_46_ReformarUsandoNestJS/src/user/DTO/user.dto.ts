import { Types } from 'mongoose';
import {
    IsEmail,
    IsNumber,
    IsPositive,
    IsString,
    IsUrl,
} from 'class-validator';

export class UserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsNumber()
    @IsPositive()
    age: number;

    @IsString()
    address: string;

    @IsUrl()
    avatar: string;

    _id: Types.ObjectId;
}
