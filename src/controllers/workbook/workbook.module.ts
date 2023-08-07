/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workbook } from './workbook.entity';
import { WorkbookService } from './workbook.service';
import { WorkbookController } from './workbook.controller';
import { Register } from '../register/register.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Workbook, Register])],
    controllers: [WorkbookController],
    providers: [WorkbookService],
    exports: [WorkbookService]
})
export class WorkbookModule { }
