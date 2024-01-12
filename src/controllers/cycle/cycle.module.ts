/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cycle } from './cycle.entity';
import { CycleService } from './cycle.service';
import { CycleController } from './cycle.controller';
import { CycleHistoryModule } from '../cycleHistory/cycleHistory.module';
import { RegisterModule } from '../register/register.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([Cycle]),
        forwardRef(() => RegisterModule),
        forwardRef(() => CycleHistoryModule),
    ],
    controllers: [CycleController],
    providers: [CycleService],
    exports: [CycleService]
})
export class CycleModule { }
