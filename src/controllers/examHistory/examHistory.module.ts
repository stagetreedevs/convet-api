/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamHistory } from './examHistory.entity';
import { ExamHistoryService } from './examHistory.service';
import { ExamHistoryController } from './examHistory.controller';
import { UserModule } from '../user/user.module';
@Module({
    imports: [TypeOrmModule.forFeature([ExamHistory]), UserModule],
    controllers: [ExamHistoryController],
    providers: [ExamHistoryService],
    exports: [ExamHistoryService]
})
export class ExamHistoryModule { }
