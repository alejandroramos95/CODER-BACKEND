import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as ms from 'ms';
import { Server } from 'socket.io';
import { NestExpressApplication } from '@nestjs/platform-express';
import { engine } from 'express-handlebars';
import { join } from 'path';
import { MessageMongo } from './utils/messageMongo.service';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const io = new Server(app.getHttpServer(), {
        cors: { origin: '/chat' },
    });
    io.listen(80);
    io.on('connection', async (socket) => {
        console.log('Nuevo usuario conectado 👋');
        const messagesDB = new MessageMongo();
        socket.emit('messages', await messagesDB.getAll());

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('new-message', (data) => {
            messagesDB.newMessage(data);
            io.sockets.emit('new-message', data);
        });
    });
    app.use(
        session({
            secret: 'XsdFEfdg',
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: ms('1h') },
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    const PathView = join(__dirname, '..');
    app.useStaticAssets(join(PathView, 'public'));
    app.setBaseViewsDir(join(PathView, 'views'));
    app.engine(
        'hbs',
        engine({
            extname: 'hbs',
        }),
    );
    app.setViewEngine('hbs');
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
