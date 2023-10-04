/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolSubject } from './school_subject.entity';

@Injectable()
export class SchoolSubjectService {
  constructor(
    @InjectRepository(SchoolSubject)
    private readonly materiaRepository: Repository<SchoolSubject>,
  ) { }

  async create(materia: SchoolSubject): Promise<SchoolSubject> {
    const createdMateria = await this.materiaRepository.save(materia);

    const codigo = await this.materiaRepository.findOne({ where: { code: createdMateria.code } });
    if (codigo) {
      throw new HttpException('Este código já foi utilizado', HttpStatus.BAD_REQUEST);
    }

    return createdMateria;
  }

  async findAll(): Promise<SchoolSubject[]> {
    return this.materiaRepository.find();
  }

  async findSelected(): Promise<{ id: string, name: string }[]> {
    return this.materiaRepository.find({ select: ['code', 'name'] });
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
