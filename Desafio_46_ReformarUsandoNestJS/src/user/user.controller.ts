import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserInterface } from './Interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(): Promise<UserInterface[]> {
        return await this.userService.getAll();
    }

    @Get(':id')
    async getById(@Param() userId: string): Promise<UserInterface> {
        return await this.userService.getById(userId);
    }

    @Post()
    async createUser(@Body() userData: UserDTO): Promise<UserInterface> {
        return await this.userService.createUser(userData);
    }

    @Delete(':id')
    async deleteUser(@Param() userId: string): Promise<UserInterface> {
        return await this.userService.deleteById(userId);
    }
}
