/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cycle } from './cycle.entity';
import { CycleService } from './cycle.service';
import { CycleController } from './cycle.controller';
@Module({
    imports: [TypeOrmModule.forFeature([Cycle])],
    controllers: [CycleController],
    providers: [CycleService],
    exports: [CycleService]
})
export class CycleModule { }
