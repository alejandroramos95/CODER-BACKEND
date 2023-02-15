import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserModule } from 'src/user/user.module';
import { SessionSerializer } from './session.serializer';

@Module({
    imports: [
        PassportModule,
        UserModule,
        PassportModule.register({ session: true }),
    ],
    providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
