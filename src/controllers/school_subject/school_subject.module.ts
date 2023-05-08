/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolSubject } from './school_subject.entity';
import { SchoolSubjectService } from './school_subject.service';
import { SchoolSubjectController } from './school_subject.controller';
@Module({
    imports: [TypeOrmModule.forFeature([SchoolSubject])],
    controllers: [SchoolSubjectController],
    providers: [SchoolSubjectService],
    exports: [SchoolSubjectService]
})
export class SchoolSubjectModule { }
