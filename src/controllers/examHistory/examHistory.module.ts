/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamHistory } from './examHistory.entity';
import { ExamHistoryService } from './examHistory.service';
import { ExamHistoryController } from './examHistory.controller';
@Module({
    imports: [TypeOrmModule.forFeature([ExamHistory])],
    controllers: [ExamHistoryController],
    providers: [ExamHistoryService],
    exports: [ExamHistoryService]
})
export class ExamHistoryModule { }
