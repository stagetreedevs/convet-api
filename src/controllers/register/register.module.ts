/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from './register.entity';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { Cycle } from '../cycle/cycle.entity';
import { CycleModule } from '../cycle/cycle.module';
import { RegisterQuestionsController } from './register-questions.controller';
import { RegisterQuestionsService } from './register-questions.service';
import { RegisterTimesController } from './register-times.controller';
import { RegisterTimesService } from './register-times.service';
import { RegisterAllQuestionsController } from './register-all-questions.controller';
import { RegisterAllQuestionsService } from './register-all-questions.service';
import { RegisterAllTimesController } from './register-all-times.constroller';
import { RegisterAllTimesService } from './register-all-times.service';
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
