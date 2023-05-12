/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { QuestionDto } from './question.dto';
import { Question } from './question.entity';
@ApiTags('Questão')
@Controller('questao')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Post()
  @ApiOperation({ summary: 'CRIAR QUESTÃO', description: 'PASSE O BODY PREENCHIDO E CRIE UMA NOVA QUESTÃO.' })
  @ApiBody({ type: QuestionDto })
  async create(@Body() question: Question): Promise<Question> {
    return this.questionService.create(question);
  }

  @Get()
  @ApiOperation({ summary: 'TODAS QUESTÕES', description: 'RETORNA TODAS AS QUESTÕES DO SISTEMA.' })
  async findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR QUESTÃO ID', description: 'PASSE O ID CORRETO E RETORNA A QUESTÃO DESEJADA.' })
  async findOne(@Param('id') id: string): Promise<Question> {
    return this.questionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR QUESTÃO', description: 'PASSE O ID CORRETO JUNTO DE UM BODY E RETORNA A QUESTÃO ATUALIZADA.' })
  async update(@Param('id') id: string, @Body() question: Question): Promise<Question> {
    return this.questionService.update(id, question);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR QUESTÃO', description: 'PASSE O ID CORRETO E DELETA A QUESTÃO DESEJADA.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.questionService.remove(id);
  }
}