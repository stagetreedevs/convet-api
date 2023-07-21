/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CycleHistory } from './cycleHistory.entity';
@Injectable()
export class CycleHistoryService {
  constructor(
    @InjectRepository(CycleHistory)
    private readonly historyService: Repository<CycleHistory>,
  ) { }

  async create(cycle: any): Promise<CycleHistory> {
    return this.historyService.save(cycle);
  }

  async findAll(): Promise<CycleHistory[]> {
    return this.historyService.find();
  }

  async findOne(id: string): Promise<CycleHistory> {
    return this.historyService.findOne({
      where: {
        id: id,
      },
    });
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
