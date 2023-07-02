/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CycleModel } from './cycleModel.entity';
import { CycleModelService } from './cycleModel.service';
import { CycleModelController } from './cycleModel.controller';
@Module({
    imports: [TypeOrmModule.forFeature([CycleModel])],
    controllers: [CycleModelController],
    providers: [CycleModelService],
    exports: [CycleModelService]
})
export class CycleModelModule { }
