import { Types } from 'mongoose';
import { IsDate, IsMongoId, IsString } from 'class-validator';

export class MessageDTO {
    @IsString()
    message: string;

    @IsDate()
    timestamp: Date;

    @IsMongoId()
    from: Types.ObjectId;
    _id: Types.ObjectId;
}
