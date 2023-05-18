/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planning } from './planning.entity';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
@Module({
    imports: [ TypeOrmModule.forFeature([Planning]) ],
    controllers: [ PlanningController ],
    providers: [ PlanningService ],
    exports:[ PlanningService]
})
export class PlanningModule { }
