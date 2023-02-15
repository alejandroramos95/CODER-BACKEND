import { Controller, Get, Res, UseGuards, Request, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthenticateGuard } from './auth/authenticated.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('api/navbar')
    navbar(@Res() res, @Request() req) {
        return this.appService.getNavbar(res, req);
    }

    @Get()
    getHome(@Res() res) {
        return this.appService.getHome(res);
    }

    @Get('login')
    getLogin(@Res() res, @Request() req) {
        return this.appService.getLogin(res, req);
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    postLogin(): object {
        return this.appService.postLogin();
    }

    @Get('logout')
    gettLogout(@Request() req: Request, @Res() res): any {
        return this.appService.getLogout(res, req);
    }

    @Get('chat')
    chat(@Request() req: Request, @Res() res) {
        return this.appService.getChat(res, req);
    }

    @Get('register')
    register(@Res() res) {
        return this.appService.getRegister(res);
    }

    @Get('products')
    products(@Res() res) {
        return this.appService.getProduct(res);
    }

    @Get('products/new')
    addProduct(@Res() res) {
        return this.appService.getAddProduct(res);
    }

    @Get('cart')
    cart(@Res() res) {
        return this.appService.getCart(res);
    }

    @UseGuards(AuthenticateGuard)
    @Get('protected')
    getProtected(@Request() req): string {
        return req.user;
    }
}
