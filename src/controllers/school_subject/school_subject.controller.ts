/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SchoolSubjectService } from './school_subject.service';
import { SchoolSubjectDto } from './school_subject.dto';
import { SchoolSubject } from './school_subject.entity';
@ApiTags('Matéria')
@Controller('materia')
export class SchoolSubjectController {
  constructor(private readonly matService: SchoolSubjectService) {}

  @Post()
  @ApiOperation({ summary: 'CRIAR MATÉRIA', description: 'PASSE O BODY PREENCHIDO E CRIE UMA MATÉRIA.' })
  @ApiBody({ type: SchoolSubjectDto })
  async create(@Body() materia: SchoolSubject): Promise<SchoolSubject> {
    return this.matService.create(materia);
  }

  @Get()
  @ApiOperation({ summary: 'TODAS MATÉRIAS', description: 'RETORNA TODAS AS MATÉRIAS.' })
  async findAll(): Promise<SchoolSubject[]> {
    return this.matService.findAll();
  }

  @Get('selected')
  async findSelected(): Promise<any[]> {
    return this.matService.findSelected();
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR MATÉRIA ID', description: 'PASSE O ID CORRETO E RETORNA A MATÉRIA DESEJADA.' })
  async findOne(@Param('id') id: string): Promise<SchoolSubject> {
    return this.matService.findOne(id);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'BUSCAR MATÉRIA NAME', description: 'PASSE O NOME CORRETO E RETORNA A MATÉRIA DESEJADA.' })
  async findName(@Param('name') name: string): Promise<SchoolSubject> {
    return this.matService.findName(name);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR MATÉRIA', description: 'PASSE O ID CORRETO JUNTO DE UM BODY E RETORNA A MATÉRIA ATUALIZADA.' })
  async update(@Param('id') id: string, @Body() materia: SchoolSubject): Promise<SchoolSubject> {
    return this.matService.update(id, materia);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR MATÉRIA', description: 'PASSE O ID CORRETO E DELETA A MATÉRIA DESEJADA.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.matService.remove(id);
  }
}
