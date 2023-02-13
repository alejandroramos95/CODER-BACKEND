import { Types } from 'mongoose';

export class UserInterface {
    name: string;
    email: string;
    password: string;
    age: number;
    address: string;
    avatar: string;
    _id: Types.ObjectId;
}
