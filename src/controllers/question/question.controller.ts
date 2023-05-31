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

  @Get('user/:id')
  @ApiOperation({ summary: 'BUSCAR AS QUESTÕES DE UM USUÁRIO ESPECÍFICO, PASSANDO SEU ID', description: 'PASSE O ID DO USUÁRIO E RETORNA As QUESTÕES DO MESMO.' })
  async findUser(@Param('id') id: string): Promise<Question[]> {
    return this.questionService.findUser(id);
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

  @Get('all/:user_id/:materia')
  @ApiOperation({ summary: 'RETORNA DADOS DE TODAS QUESTÕES', description: 'PASSE COMO PARÂMETROS ID DO USUÁRIO E NOME DA MATÉRIA PARA OBTER OS DADOS.' })
  async getAll(@Param('user_id') user_id: string, @Param('materia') materia: string): Promise<any[]> {
    const hours = await this.questionService.allAnswers(user_id, materia);
    return hours;
  }

  @Get('year/:user_id/:materia')
  @ApiOperation({ summary: 'RETORNA DADOS DE TODAS QUESTÕES DO ANO ATUAL', description: 'PASSE COMO PARÂMETROS ID DO USUÁRIO E NOME DA MATÉRIA PARA OBTER OS DADOS.' })
  async getYear(@Param('user_id') user_id: string, @Param('materia') materia: string): Promise<any[]> {
    const hours = await this.questionService.yearAnswers(user_id, materia);
    return hours;
  }
  
  @Get('month/:user_id/:materia')
  @ApiOperation({ summary: 'RETORNA DADOS DE TODAS QUESTÕES DO MÊS ATUAL', description: 'PASSE COMO PARÂMETROS ID DO USUÁRIO E NOME DA MATÉRIA PARA OBTER OS DADOS.' })
  async getMonth(@Param('user_id') user_id: string, @Param('materia') materia: string): Promise<any[]> {
    const hours = await this.questionService.monthAnswers(user_id, materia);
    return hours;
  }

  @Get('week/:user_id/:materia')
  @ApiOperation({ summary: 'RETORNA DADOS DE TODAS QUESTÕES DA SEMANA ATUAL', description: 'PASSE COMO PARÂMETROS ID DO USUÁRIO E NOME DA MATÉRIA PARA OBTER OS DADOS.' })
  async getWeek(@Param('user_id') user_id: string, @Param('materia') materia: string): Promise<any[]> {
    const hours = await this.questionService.weekAnswers(user_id, materia);
    return hours;
  }

  @Get('day/:user_id/:materia')
  @ApiOperation({ summary: 'RETORNA DADOS DE TODAS QUESTÕES DO DIA ATUAL', description: 'PASSE COMO PARÂMETROS ID DO USUÁRIO E NOME DA MATÉRIA PARA OBTER OS DADOS.' })
  async getDay(@Param('user_id') user_id: string, @Param('materia') materia: string): Promise<any[]> {
    const hours = await this.questionService.dayAnswers(user_id, materia);
    return hours;
  }
}
