import { Module } from '@nestjs/common';
import { UserMongo } from 'src/utils/userMongo.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    providers: [UserService, UserMongo],
    controllers: [UserController],
})
export class UserModule {}
