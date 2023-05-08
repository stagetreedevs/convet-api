/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
    imports: [ TypeOrmModule.forFeature([Question]) ],
    controllers: [ QuestionController ],
    providers: [ QuestionService ],
    exports:[ QuestionService]
})
export class QuestionModule { }
