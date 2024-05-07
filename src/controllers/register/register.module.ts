/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from './register.entity';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { Cycle } from '../cycle/cycle.entity';
import { CycleModule } from '../cycle/cycle.module';
import { RegisterQuestionsController } from './questions/register-questions.controller';
import { RegisterQuestionsService } from './questions/register-questions.service';
import { RegisterTimesController } from './times/register-times.controller';
import { RegisterTimesService } from './times/register-times.service';
import { RegisterAllQuestionsController } from './allQuestions/register-all-questions.controller';
import { RegisterAllQuestionsService } from './allQuestions/register-all-questions.service';
import { RegisterAllTimesController } from './allTimes/register-all-times.constroller';
import { RegisterAllTimesService } from './allTimes/register-all-times.service';
@Module({
    imports: [
        forwardRef(() => CycleModule),
        TypeOrmModule.forFeature([Cycle]),
        TypeOrmModule.forFeature([Register]),
    ],
    controllers: [
        RegisterController,
        RegisterQuestionsController,
        RegisterAllQuestionsController,
        RegisterTimesController,
        RegisterAllTimesController
    ],
    providers: [
        RegisterService,
        RegisterQuestionsService,
        RegisterAllQuestionsService,
        RegisterTimesService,
        RegisterAllTimesService
    ],
    exports: [RegisterService]
})
export class RegisterModule { }
