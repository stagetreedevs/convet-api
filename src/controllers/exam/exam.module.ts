/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './exam.entity';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { ExamHistoryModule } from '../examHistory/examHistory.module';
@Module({
    imports: [TypeOrmModule.forFeature([Exam]), ExamHistoryModule],
    controllers: [ExamController],
    providers: [ExamService],
    exports: [ExamService]
})
export class ExamModule { }
