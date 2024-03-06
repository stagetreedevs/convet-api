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
@Module({
    imports: [
        forwardRef(() => CycleModule),
        TypeOrmModule.forFeature([Cycle]),
        TypeOrmModule.forFeature([Register]),
    ],
    controllers: [RegisterController, RegisterQuestionsController],
    providers: [RegisterService, RegisterQuestionsService],
    exports: [RegisterService]
})
export class RegisterModule { }
