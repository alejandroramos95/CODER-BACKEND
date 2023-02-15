import { Injectable, Res, Request } from '@nestjs/common';
import { Response } from 'express';
import { MessageInterface } from './Messages/Interface/message.interface';
import { MessageMongo } from './utils/messageMongo.service';

@Injectable()
export class AppService {
    constructor(private messageMongo: MessageMongo) {}

    getNavbar(@Res() res: Response, @Request() req) {
        console.log(req.user);
        return res.render('main', {
            title: 'Home',
            layout: 'navbar',
            user: req.user,
        });
    }

    getHome(@Res() res: Response) {
        return res.render('main', {
            title: 'Chat',
            layout: 'index',
        });
    }

    getLogin(@Res() res: Response, @Request() req) {
        if (req.user) return res.redirect('/');
        return res.render('main', {
            title: 'Login',
            layout: 'login',
        });
    }

    postLogin(): any {
        return { msg: 'login sucesslfully', status: 200 };
    }

    getRegister(@Res() res: Response) {
        return res.render('main', { title: 'Register', layout: 'register' });
    }

    getChat(@Res() res: Response, @Request() req) {
        if (!req.user) {
            return res.redirect('/login');
        }
        return res.render('main', {
            title: 'Chat',
            layout: 'chat',
            userImg: req.user.avatar,
        });
    }

    getProduct(@Res() res: Response) {
        return res.render('main', { title: 'Products', layout: 'products' });
    }

    getAddProduct(@Res() res: Response) {
        return res.render('main', {
            title: 'Add Product',
            layout: 'addProduct',
        });
    }

    getCart(@Res() res: Response) {
        return res.render('main', { title: 'Cart', layout: 'cart' });
    }

    getLogout(@Res() res: Response, @Request() req) {
        if (!req.user) return res.redirect('/');
        req.logout((err) => {
            if (err) {
                console.log(err);
            }
        });
        return res.redirect('/');
    }

    async getMessages(): Promise<MessageInterface[]> {
        return await this.messageMongo.getAll();
    }
}
