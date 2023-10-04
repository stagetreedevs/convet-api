/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observation } from './observation.entity';
// import { forkJoin } from 'rxjs';
@Injectable()
export class ObservationService {
  constructor(
    @InjectRepository(Observation)
    private readonly obsRepository: Repository<Observation>,
  ) { }

  async create(obs: Observation): Promise<Observation> {
    return this.obsRepository.save(obs);
  }

  async findAll(): Promise<Observation[]> {
    return this.obsRepository.find();
  }

  async findOne(id: string): Promise<Observation> {
    return this.obsRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async findByPlanning(planning_id: string): Promise<Observation[]> {
    return await this.obsRepository.find({
      where: {
        planning: planning_id,
      },
    });
  }

  async findByUser(id: string): Promise<any[]> {
    return await this.obsRepository.find({
      where: {
        teacher: id,
      },
    });
  }
  

  async update(id: string, obs: Observation): Promise<Observation> {
    await this.obsRepository.update(id, obs);
    return this.obsRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async remove(id: string): Promise<void> {
    await this.obsRepository.delete(id);
  }
}
