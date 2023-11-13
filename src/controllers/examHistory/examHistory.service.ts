/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamHistory } from './examHistory.entity';
@Injectable()
export class ExamHistoryService {
  constructor(
    @InjectRepository(ExamHistory) private readonly examHisRepository: Repository<ExamHistory>,
  ) { }

  async create(simulado: ExamHistory): Promise<ExamHistory> {
    const alreadyExists = await this.findExisting(simulado.user_id, simulado.exam_id);
    if (alreadyExists) {
      throw new HttpException('Ja existem informacoes cadastradas para este simulado', HttpStatus.BAD_REQUEST);
    }

    return await this.examHisRepository.save(simulado);
  }

  async findExisting(user_id: string, exam_id: string): Promise<ExamHistory> {
    return this.examHisRepository.findOne({
      where: {
        user_id: user_id,
        exam_id: exam_id,
      }
    });
  }

  async findAll(): Promise<ExamHistory[]> {
    return this.examHisRepository.find();
  }

  async findOne(id: string): Promise<ExamHistory> {
    return this.examHisRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async findByCode(id: string): Promise<ExamHistory[]> {
    return this.examHisRepository.find({
      where: {
        contest_code: id
      }
    });
  }

  async findByUserId(id: string): Promise<ExamHistory[]> {
    return this.examHisRepository.find({
      where: {
        user_id: id,
      }
    });
  }

  async findByExamId(id: string): Promise<ExamHistory[]> {
    return this.examHisRepository.find({
      where: {
        exam_id: id,
      }
    });
  }

  async update(id: string, simulado: ExamHistory): Promise<ExamHistory> {
    await this.examHisRepository.update(id, simulado);
    return await this.findOne(id);
  }

  async remove(id: any): Promise<void> {
    await this.examHisRepository.delete(id);
  }
}