/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanningCycle } from './planning_cycle.entity';
@Injectable()
export class PlanningCycleService {
  constructor(
    @InjectRepository(PlanningCycle)
    private readonly cycleService: Repository<PlanningCycle>,
  ) { }

  async create(cycle: PlanningCycle): Promise<PlanningCycle> {
    return this.cycleService.save(cycle);
  }

  async findAll(): Promise<PlanningCycle[]> {
    return this.cycleService.find();
  }

  async findUser(user_id: string): Promise<PlanningCycle[]> {
    return this.cycleService.find({
      where: {
        user: user_id,
      },
    });
  }  

  async findOne(id: string): Promise<PlanningCycle> {
    return this.cycleService.findOne({
      where: {
        id: id,
      }
    });
  }

  async update(id: string, cycle: PlanningCycle): Promise<PlanningCycle> {
    await this.cycleService.update(id, cycle);
    return this.cycleService.findOne({
      where: {
        id: id,
      }
    });
  }

  async remove(id: string): Promise<void> {
    await this.cycleService.delete(id);
  }
}
