/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cycle } from './cycle.entity';
import { CycleService } from './cycle.service';
import { CycleController } from './cycle.controller';
import { CycleHistoryService } from '../cycleHistory/cycleHistory.service';
import { CycleHistory } from '../cycleHistory/cycleHistory.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Cycle]), TypeOrmModule.forFeature([CycleHistory])],
    controllers: [CycleController],
    providers: [CycleService, CycleHistoryService],
    exports: [CycleService]
})
export class CycleModule { }
