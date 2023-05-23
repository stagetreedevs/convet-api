/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository, Between } from 'typeorm';
import { startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns';
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

  async allAnswers(user_id: string): Promise<any> {
    const questions = await this.questionRepository.find({
      where: {
        user: user_id,
      },
      select: ['hits', 'mistakes'],
    });

    const totalHits = questions.reduce((sum, question) => sum + question.hits, 0);
    const totalMistakes = questions.reduce((sum, question) => sum + question.mistakes, 0);
    const total = totalHits + totalMistakes;

    const hitPercentage = ((totalHits / total) * 100).toFixed(2);
    const mistakePercentage = ((totalMistakes / total) * 100).toFixed(2);

    return {
      totalHits,
      totalMistakes,
      total,
      hitPercentage,
      mistakePercentage,
    };
  }

  async yearAnswers(user_id: string): Promise<any> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const questions = await this.questionRepository.find({
      where: {
        user: user_id,
        created_date: Raw(alias => `${alias} >= '${currentYear}-01-01'`),
      },
      select: ['hits', 'mistakes'],
    });

    const totalHits = questions.reduce((sum, question) => sum + question.hits, 0);
    const totalMistakes = questions.reduce((sum, question) => sum + question.mistakes, 0);
    const total = totalHits + totalMistakes;

    const hitPercentage = ((totalHits / total) * 100).toFixed(2);
    const mistakePercentage = ((totalMistakes / total) * 100).toFixed(2);

    return {
      totalHits,
      totalMistakes,
      total,
      hitPercentage,
      mistakePercentage,
    };
  }

  async monthAnswers(user_id: string): Promise<any> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Os meses são indexados a partir de 0, então adicionamos 1 para obter o mês atual
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59);

    const questions = await this.questionRepository.find({
      where: {
        user: user_id,
        created_date: Between(startOfMonth, endOfMonth),
      },
      select: ['hits', 'mistakes'],
    });

    const totalHits = questions.reduce((sum, question) => sum + question.hits, 0);
    const totalMistakes = questions.reduce((sum, question) => sum + question.mistakes, 0);
    const total = totalHits + totalMistakes;

    const hitPercentage = ((totalHits / total) * 100).toFixed(2);
    const mistakePercentage = ((totalMistakes / total) * 100).toFixed(2);

    return {
      totalHits,
      totalMistakes,
      total,
      hitPercentage,
      mistakePercentage,
    };
  }

  async weekAnswers(user_id: string): Promise<any> {
    const currentDate = new Date();
    const startOfWeekDate = startOfWeek(currentDate);
    const endOfWeekDate = endOfWeek(currentDate);

    const questions = await this.questionRepository.find({
      where: {
        user: user_id,
        created_date: Between(startOfWeekDate, endOfWeekDate),
      },
      select: ['hits', 'mistakes'],
    });

    const totalHits = questions.reduce((sum, question) => sum + question.hits, 0);
    const totalMistakes = questions.reduce((sum, question) => sum + question.mistakes, 0);
    const total = totalHits + totalMistakes;

    const hitPercentage = ((totalHits / total) * 100).toFixed(2);
    const mistakePercentage = ((totalMistakes / total) * 100).toFixed(2);

    return {
      totalHits,
      totalMistakes,
      total,
      hitPercentage,
      mistakePercentage,
    };
  }

  async dayAnswers(user_id: string): Promise<any> {
    const currentDate = new Date();
    const startOfDayDate = startOfDay(currentDate);
    const endOfDayDate = endOfDay(currentDate);

    const questions = await this.questionRepository.find({
      where: {
        user: user_id,
        created_date: Between(startOfDayDate, endOfDayDate),
      },
      select: ['hits', 'mistakes'],
    });

    const totalHits = questions.reduce((sum, question) => sum + question.hits, 0);
    const totalMistakes = questions.reduce((sum, question) => sum + question.mistakes, 0);
    const total = totalHits + totalMistakes;

    const hitPercentage = ((totalHits / total) * 100).toFixed(2);
    const mistakePercentage = ((totalMistakes / total) * 100).toFixed(2);

    return {
      totalHits,
      totalMistakes,
      total,
      hitPercentage,
      mistakePercentage,
    };
  }

}
