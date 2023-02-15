import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessageMongo } from './utils/messageMongo.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ProductModule,
        CartModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, MessageMongo],
})
export class AppModule {}
