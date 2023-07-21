/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CycleHistory } from './cycleHistory.entity';
import { CycleHistoryService } from './cycleHistory.service';
import { CycleHistoryController } from './cycleHistory.controller';
@Module({
    imports: [TypeOrmModule.forFeature([CycleHistory])],
    controllers: [CycleHistoryController],
    providers: [CycleHistoryService],
    exports: [CycleHistoryService]
})
export class CycleHistoryModule { }
