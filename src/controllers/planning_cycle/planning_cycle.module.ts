/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanningCycle } from './planning_cycle.entity';
import { PlanningCycleService } from './planning_cycle.service';
import { PlanningCycleController } from './planning_cycle.controller';
@Module({
    imports: [TypeOrmModule.forFeature([PlanningCycle])],
    controllers: [PlanningCycleController],
    providers: [PlanningCycleService],
    exports: [PlanningCycleService]
})
export class PlanningCycleModule { }
