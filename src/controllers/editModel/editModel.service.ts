/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditModel } from './editModel.entity';
@Injectable()
export class EditModelService {
    constructor(
        @InjectRepository(EditModel) private readonly editRepository: Repository<EditModel>,
    ) { }

    async create(model: any): Promise<any> {
        return this.editRepository.save(model);
    }

    async findAll(): Promise<any[]> {
        return this.editRepository.find();
    }

    async findOne(id: string): Promise<any> {
        return this.editRepository.findOne({ where: { id: id } });
    }

    async findByUserModel(user_id: string, model_id: string): Promise<any> {
        return this.editRepository.findOne({ where: { user_id, model_id } });
    }

    async update(id: string, model: any): Promise<any> {
        await this.editRepository.update(id, model);
        return this.findOne(id);
    }

    async updateMaterias(id: string, materias: any): Promise<any> {
        await this.editRepository.update(id, { materias });
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.editRepository.delete(id);
    }

}