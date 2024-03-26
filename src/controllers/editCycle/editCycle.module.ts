/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditCycleController } from './editCycle.controller';
import { EditCycle } from './editCycle.entity';
import { EditCycleService } from './editCycle.service';
@Module({
    imports: [TypeOrmModule.forFeature([EditCycle])],
    controllers: [EditCycleController],
    providers: [EditCycleService],
    exports: [EditCycleService]
})
export class EditCycleModule { }