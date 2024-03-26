/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditCycle } from './editCycle.entity';
@Injectable()
export class EditCycleService {
    constructor(
        @InjectRepository(EditCycle) private readonly editRepository: Repository<EditCycle>,
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

    async findByUser(user_id: string): Promise<any> {
        return await this.editRepository.findOne({ where: { user_id: user_id } });
    }

    async update(id: string, model: any): Promise<any> {
        await this.editRepository.update(id, model);
        return this.findOne(id);
    }

    async updateMaterias(id: string, materias: any): Promise<any> {
        // Atualiza as materias
        await this.editRepository.update(id, { materias });

        // Atualiza data
        const edicao = await this.findOne(id);
        edicao.date = new Date().toISOString();
        await this.update(id, edicao);

        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.editRepository.delete(id);
    }

}