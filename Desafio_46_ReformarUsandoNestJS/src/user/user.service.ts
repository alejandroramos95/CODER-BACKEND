import { Injectable } from '@nestjs/common';
import { UserMongo } from 'src/utils/userMongo.service';
import { UserInterface } from './Interface/user.interface';

@Injectable()
export class UserService {
    constructor(private readonly userModel: UserMongo) {}

    async createUser(user: UserInterface): Promise<UserInterface> {
        return await this.userModel.createUser(user);
    }

    async getAll(): Promise<UserInterface[]> {
        return await this.userModel.getAll();
    }

    async getById(id: string): Promise<UserInterface> {
        return await this.userModel.getById(id);
    }

    async deleteById(id: string): Promise<UserInterface> {
        return await this.userModel.deleteById(id);
    }
}
