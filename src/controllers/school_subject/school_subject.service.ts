/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolSubject } from './school_subject.entity';

@Injectable()
export class SchoolSubjectService {
  constructor(
    @InjectRepository(SchoolSubject)
    private readonly materiaRepository: Repository<SchoolSubject>,
  ) {}

  async create(materia: SchoolSubject): Promise<SchoolSubject> {
    return this.materiaRepository.save(materia);
  }

  async findAll(): Promise<SchoolSubject[]> {
    return this.materiaRepository.find();
  }

  async findOne(id: string): Promise<SchoolSubject> {
    return this.materiaRepository.findOne({
        where: {
            id: id,
        }
    });
  }

  async findName(name: string): Promise<SchoolSubject> {
    return this.materiaRepository.findOne({
        where: {
            name: name,
        }
    });
  }

  async update(id: string, materia: SchoolSubject): Promise<SchoolSubject> {
    await this.materiaRepository.update(id, materia);
    return this.materiaRepository.findOne({
        where: {
            id: id,
        }
    });
  }

  async remove(id: string): Promise<void> {
    await this.materiaRepository.delete(id);
  }
}
