/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cycle } from './cycle.entity';
@Injectable()
export class CycleService {
  constructor(
    @InjectRepository(Cycle)
    private readonly cycleService: Repository<Cycle>,
  ) { }

  async create(cycle: any): Promise<Cycle> {
    return this.cycleService.save(cycle);
  }

  async findAll(): Promise<Cycle[]> {
    return this.cycleService.find();
  }

  async findUser(user_id: string): Promise<Cycle[]> {
    return this.cycleService.find({
      where: {
        user: user_id,
      },
    });
  }

  async userArray(user_id: string): Promise<any[]> {
    const cycles = await this.cycleService.find({
      where: {
        user: user_id,
      },
    });

    return cycles.flatMap((cycle) => cycle.materias);
  }

  async findOne(id: string): Promise<Cycle> {
    return this.cycleService.findOne({
      where: {
        id: id,
      }
    });
  }

  async findMaterias(user_id: string): Promise<any> {
    return this.cycleService.findOne({
      where: {
        user: user_id,
      },
    });
  }

  async update(id: string, cycle: Cycle): Promise<Cycle> {
    await this.cycleService.update(id, cycle);
    return this.cycleService.findOne({
      where: {
        id: id,
      }
    });
  }

  async updateMaterias(id: string, disciplinas: any): Promise<Cycle> {
    await this.cycleService.update(id, { materias: disciplinas });
    return this.cycleService.findOne({
      where: {
        id: id,
      }
    });
  }


  async remove(id: string): Promise<void> {
    await this.cycleService.delete(id);
  }

  async deleteByUser(userId: string): Promise<void> {
    const cycle = await this.cycleService.findOne({ where: { user: userId } });

    if (cycle) {
      await this.cycleService.remove(cycle);
    }
  }
}
