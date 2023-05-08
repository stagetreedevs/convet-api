/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from './register.entity';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
@Module({
    imports: [ TypeOrmModule.forFeature([Register]) ],
    controllers: [ RegisterController ],
    providers: [ RegisterService ],
    exports:[ RegisterService]
})
export class RegisterModule { }
