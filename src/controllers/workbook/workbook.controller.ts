/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WorkbookService } from './workbook.service';
import { WorkbookDto } from './workbook.dto';
import { Workbook } from './workbook.entity';
@ApiTags('Apostila')
@Controller('workbook')
export class WorkbookController {
  constructor(private readonly workbookService: WorkbookService) { }

  @Post()
  @ApiOperation({ summary: 'CRIAR APOSTILA', description: 'PASSE O BODY PREENCHIDO E CRIE UMA APOSTILA.' })
  @ApiBody({ type: WorkbookDto })
  async create(@Body() materia: Workbook): Promise<Workbook> {
    return this.workbookService.create(materia);
  }

  @Get()
  @ApiOperation({ summary: 'TODAS APOSTILAS', description: 'RETORNA TODAS AS APOSTILAS.' })
  async findAll(): Promise<Workbook[]> {
    return this.workbookService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR APOSTILA ID', description: 'PASSE O ID CORRETO E RETORNA A APOSTILA DESEJADA.' })
  async findOne(@Param('id') id: string): Promise<Workbook> {
    return this.workbookService.findOne(id);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'BUSCAR APOSTILA NOME', description: 'PASSE O NOME CORRETO E RETORNA A APOSTILA DESEJADA.' })
  async findName(@Param('name') name: string): Promise<Workbook> {
    return this.workbookService.findName(name);
  }

  @Get('materia/:name')
  @ApiOperation({ summary: 'BUSCAR APOSTILAS POR CÓDIGO DA MATÉRIA', description: 'PASSE O CÓDIGO DA MATÉRIA E RETORNA AS APOSTILAS DESEJADAS.' })
  async findMateria(@Param('name') name: string): Promise<Workbook> {
    return this.workbookService.findMateria(name);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR APOSTILA', description: 'PASSE O ID CORRETO JUNTO DE UM BODY E RETORNA A APOSTILA ATUALIZADA.' })
  async update(@Param('id') id: string, @Body() materia: Workbook): Promise<Workbook> {
    return this.workbookService.update(id, materia);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR APOSTILA', description: 'PASSE O ID CORRETO E DELETA A APOSTILA DESEJADA.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.workbookService.remove(id);
  }
}
