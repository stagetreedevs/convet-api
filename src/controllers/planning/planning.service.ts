/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planning } from './planning.entity';
@Injectable()
export class PlanningService {
  constructor(
    @InjectRepository(Planning)
    private readonly planningRepository: Repository<Planning>,
  ) { }

  async create(pln: Planning): Promise<Planning> {
    return this.planningRepository.save(pln);
  }

  async findAll(): Promise<Planning[]> {
    return this.planningRepository.find();
  }

  async findOne(id: string): Promise<Planning> {
    return this.planningRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async update(id: string, pln: Planning): Promise<Planning> {
    await this.planningRepository.update(id, pln);
    return this.planningRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async remove(id: string): Promise<void> {
    await this.planningRepository.delete(id);
  }
}
