/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExamHistoryService } from './examHistory.service';
import { ExamHistoryDto } from './examHistory.dto';
import { ExamHistory } from './examHistory.entity';
@ApiTags('Histórico de Simulados')
@Controller('exams')
export class ExamHistoryController {
  constructor(private readonly examHistService: ExamHistoryService) { }

  @Post()
  @ApiOperation({ summary: 'REGISTRAR QUESTÕES PARA UM SIMULADO' })
  @ApiBody({ type: ExamHistoryDto })
  async create(@Body() materia: ExamHistory): Promise<ExamHistory> {
    return this.examHistService.create(materia);
  }

  @Get()
  @ApiOperation({ summary: 'TODAS QUESTÕES REGISTRADAS' })
  async findAll(): Promise<ExamHistory[]> {
    return this.examHistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR QUESTÕES REGISTRADAS PARA UM SIMULADO VIA ID' })
  async findOne(@Param('id') id: string): Promise<ExamHistory> {
    return this.examHistService.findOne(id);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'BUSCAR QUESTÕES REGISTRADAS VIA CÓDIGO DE CONCURSO' })
  async findByCode(@Param('code') code: string): Promise<ExamHistory[]> {
    return this.examHistService.findByCode(code);
  }

  @Get('user_id/:user_id')
  @ApiOperation({ summary: 'BUSCAR QUESTÕES REGISTRADAS VIA ID DO USUÁRIO' })
  async findByUserId(@Param('user_id') user_id: string): Promise<ExamHistory[]> {
    return this.examHistService.findByUserId(user_id);
  }

  @Get('exam_id/:exam_id')
  @ApiOperation({ summary: 'BUSCAR QUESTÕES REGISTRADAS VIA ID DO SIMULADO' })
  async findByExamId(@Param('exam_id') exam_id: string): Promise<ExamHistory[]> {
    return this.examHistService.findByExamId(exam_id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR REGISTRO DE QUESTÕES'})
  @ApiBody({ type: ExamHistoryDto })
  async update(@Param('id') id: string, @Body() materia: ExamHistory): Promise<ExamHistory> {
    return this.examHistService.update(id, materia);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR MATÉRIA', description: 'PASSE O ID CORRETO E DELETA O SIMULADO DESEJADA.' })
  async remove(@Param('id') id: any): Promise<void> {
    return this.examHistService.remove(id);
  }
}
