/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExamService } from './exam.service';
import { ExamDto } from './exam.dto';
import { Exam } from './exam.entity';

@ApiTags('Simulado')
@Controller('simulado')
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  @Post()
  @ApiOperation({ summary: 'CRIAR APOSTILA', description: 'PASSE O BODY PREENCHIDO E CRIE UMA APOSTILA.' })
  @ApiBody({ type: ExamDto })
  async create(@Body() materia: Exam): Promise<Exam> {
    return this.examService.create(materia);
  }

  @Get()
  @ApiOperation({ summary: 'TODAS APOSTILAS', description: 'RETORNA TODAS AS APOSTILAS.' })
  async findAll(): Promise<Exam[]> {
    return this.examService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR APOSTILA VIA ID', description: 'PASSE O ID CORRETO E RETORNA A APOSTILA DESEJADA.' })
  async findOne(@Param('id') id: string): Promise<Exam> {
    return this.examService.findOne(id);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'BUSCAR APOSTILA POR NOME', description: 'PASSE O NOME CORRETO E RETORNA A APOSTILA DESEJADA.' })
  async findContestCode(@Param('name') name: string): Promise<Exam> {
    return this.examService.findContestCode(name);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR APOSTILA', description: 'PASSE O ID CORRETO JUNTO DE UM BODY E RETORNA A APOSTILA ATUALIZADA.' })
  @ApiBody({ type: ExamDto })
  async update(@Param('id') id: string, @Body() materia: Exam): Promise<Exam> {
    return this.examService.update(id, materia);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR APOSTILA', description: 'PASSE O ID CORRETO E DELETA A APOSTILA DESEJADA.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.examService.remove(id);
  }
}
