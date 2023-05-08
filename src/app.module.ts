/* eslint-disable prettier/prettier */
import { UserModule } from './controllers/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { environment } from './environment';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { SchoolSubjectModule } from './controllers/school_subject/school_subject.module';
import { RegisterModule } from './controllers/register/register.module';
import { QuestionModule } from './controllers/question/question.module';
import { SwaggerModule } from '@nestjs/swagger';
@Module({
  imports: [
    UserModule,
    SchoolSubjectModule,
    RegisterModule,
    QuestionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environment.PG_HOST,
      port: environment.PG_PORT ,
      username: environment.PG_USER,
      password: environment.PG_PASSWORD,
      database: environment.PG_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    JwtModule.register({
      secret: 'mySecretKey',
      signOptions: { expiresIn: '24h' },
    }),
    SwaggerModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule { }