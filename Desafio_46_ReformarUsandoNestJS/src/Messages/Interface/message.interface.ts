import { Types } from 'mongoose';

export class MessageInterface {
    message: string;
    timestamp: Date;
    from: Types.ObjectId;
    _id: Types.ObjectId;
}
