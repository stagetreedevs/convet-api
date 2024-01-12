/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CycleHistory } from './cycleHistory.entity';
import { CycleHistoryService } from './cycleHistory.service';
import { CycleHistoryController } from './cycleHistory.controller';
import { CycleModule } from '../cycle/cycle.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([CycleHistory]),
        forwardRef(() => CycleModule),
    ],
    controllers: [CycleHistoryController],
    providers: [CycleHistoryService],
    exports: [CycleHistoryService]
})
export class CycleHistoryModule { }
