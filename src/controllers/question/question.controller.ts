/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.entity';

@Controller('questao')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(@Body() question: Question): Promise<Question> {
    return this.questionService.create(question);
  }

  @Get()
  async findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Question> {
    return this.questionService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() question: Question): Promise<Question> {
    return this.questionService.update(id, question);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.questionService.remove(id);
  }
}
