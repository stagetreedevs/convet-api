/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CycleModel } from './cycleModel.entity';
@Injectable()
export class CycleModelService {
  constructor(
    @InjectRepository(CycleModel)
    private readonly cycleModelService: Repository<CycleModel>,
  ) { }

  async create(cycle: any): Promise<CycleModel> {
    const existingCycle = await this.cycleModelService.findOne({ where: { name: cycle.name } });

    if (existingCycle) {
      throw new Error('O ciclo com esse nome já existe.');
    }

    return this.cycleModelService.save(cycle);
  }

  async findAll(): Promise<CycleModel[]> {
    return this.cycleModelService.find();
  }

  async findOne(id: string): Promise<CycleModel> {
    return this.cycleModelService.findOne({
      where: {
        id: id,
      }
    });
  }

  async update(id: string, cycle: CycleModel): Promise<CycleModel> {
    await this.cycleModelService.update(id, cycle);
    return this.cycleModelService.findOne({
      where: {
        id: id,
      }
    });
  }

  async updateMaterias(id: string, disciplinas: any): Promise<CycleModel> {
    await this.cycleModelService.update(id, { materias: disciplinas });
    return this.findOne(id);
  }


  async remove(id: string): Promise<void> {
    await this.cycleModelService.delete(id);
  }

}