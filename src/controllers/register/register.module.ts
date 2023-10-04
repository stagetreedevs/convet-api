/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from './register.entity';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { Cycle } from '../cycle/cycle.entity';
@Module({
    imports: [ TypeOrmModule.forFeature([Register]), TypeOrmModule.forFeature([Cycle]) ],
    controllers: [ RegisterController ],
    providers: [ RegisterService ],
    exports:[ RegisterService]
})
export class RegisterModule { }
