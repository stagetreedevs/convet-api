/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/controllers/user/user.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports:[
    UserModule, 
    PassportModule, 
    JwtModule.register({
      secret: 'mySecretKey',
      signOptions: { expiresIn: '24h' },
    }),],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}