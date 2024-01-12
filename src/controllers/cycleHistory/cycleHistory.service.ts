/* eslint-disable prettier/prettier */
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CycleHistory } from './cycleHistory.entity';
import { CycleService } from '../cycle/cycle.service';
@Injectable()
export class CycleHistoryService {
  constructor(
    @InjectRepository(CycleHistory) private readonly historyService: Repository<CycleHistory>,
    @Inject(forwardRef(() => CycleService)) private readonly cycleService: CycleService,
  ) { }

  async create(cycle: any): Promise<CycleHistory> {
    return this.historyService.save(cycle);
  }

  async findAll(): Promise<CycleHistory[]> {
    return this.historyService.find();
  }

  async findOne(id: string): Promise<CycleHistory> {
    const ciclo = await this.historyService.findOne({ where: { id } });
    const orderMaterias = await this.cycleService.fullCycle(ciclo);
    // Adicionar cada item do orderMaterias ao array ciclo.materias
    ciclo.materias = [];
    for (const item of orderMaterias) {
      ciclo.materias.push(...item);
    }

    return ciclo;
  }

  async findByUser(id: string): Promise<CycleHistory[]> {
    const options: FindManyOptions<CycleHistory> = {
      where: {
        user: id,
      },
      order: {
        replacement: 'DESC',
      },
    };

    return this.historyService.find(options);
  }

  async update(id: string, cycle: CycleHistory): Promise<CycleHistory> {
    await this.historyService.update(id, cycle);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.historyService.delete(id);
  }

}
