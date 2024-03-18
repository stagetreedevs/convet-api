/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditModelController } from './editModel.controller';
import { EditModel } from './editModel.entity';
import { EditModelService } from './editModel.service';
@Module({
    imports: [TypeOrmModule.forFeature([EditModel])],
    controllers: [EditModelController],
    providers: [EditModelService],
    exports: [EditModelService]
})
export class EditModelModule { }
