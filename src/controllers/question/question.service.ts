/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) { }

  async create(quest: Question): Promise<Question> {
    return this.questionRepository.save(quest);
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async findUser(user_id: string): Promise<Question[]> {
    return this.questionRepository.find({
      where: {
        user: user_id,
      },
    });
  }  

  async findOne(id: string): Promise<Question> {
    return this.questionRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async update(id: string, quest: Question): Promise<Question> {
    await this.questionRepository.update(id, quest);
    return this.questionRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async remove(id: string): Promise<void> {
    await this.questionRepository.delete(id);
  }
}
