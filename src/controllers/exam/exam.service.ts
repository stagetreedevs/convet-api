/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './exam.entity';
import { ExamHistoryService } from '../examHistory/examHistory.service';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam) private readonly examRepository: Repository<Exam>,
    private historyService: ExamHistoryService
  ) { }

  async create(simulado: Exam): Promise<Exam> {
    const codigo = await this.examRepository.findOne({ where: { contest_code: simulado.contest_code } });
    if (codigo) {
      throw new HttpException('Ja existe um simulado com este codigo', HttpStatus.BAD_REQUEST);
    }

    return await this.examRepository.save(simulado);
  }

  async findAll(): Promise<Exam[]> {
    return this.examRepository.find();
  }

  async findOne(id: string): Promise<Exam> {
    return this.examRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async findContestCode(contest_code: string): Promise<Exam> {
    return this.examRepository.findOne({
      where: {
        contest_code: contest_code,
      }
    });
  }

  async update(id: string, exam: Exam): Promise<Exam> {
    await this.examRepository.update(id, exam);
    return this.examRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async remove(id: string): Promise<void> {
    const exams = await this.historyService.findByExamId(id);

    if (exams.length > 0) {
      for (const subjectId of exams) {
        await this.historyService.remove(subjectId.id);
      }
    }

    await this.examRepository.delete(id);
  }


}
