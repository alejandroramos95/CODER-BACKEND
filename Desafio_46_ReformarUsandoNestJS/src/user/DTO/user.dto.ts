import { Types } from 'mongoose';
import {
    IsEmail,
    IsNumberString,
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

    @IsNumberString()
    age: number;

    @IsString()
    address: string;

    @IsUrl()
    avatar: string;

    _id: Types.ObjectId;
}
