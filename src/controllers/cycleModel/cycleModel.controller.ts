/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CycleModelService } from './cycleModel.service';
import { CycleModelDto } from './cycleModel.dto';
import { CycleModel } from './cycleModel.entity';
@ApiTags('Ciclo Modelo')
@Controller('modelo')
export class CycleModelController {

  constructor(private readonly cycleService: CycleModelService) { }

  @Post()
  @ApiOperation({ summary: 'CRIAR CICLO MODELO', description: 'PASSE O BODY PREENCHIDO E CRIE UM NOVO CICLO MODELO.' })
  @ApiBody({ type: CycleModelDto })
  async create(@Body() cycle: CycleModel): Promise<CycleModel> {
    return this.cycleService.create(cycle);
  }

  @Get()
  @ApiOperation({ summary: 'TODOS CICLOS MODELO', description: 'RETORNA TODAS OS CICLOS MODELO DO SISTEMA.' })
  async findAll(): Promise<CycleModel[]> {
    return this.cycleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR CICLO MODELO ID', description: 'PASSE O ID CORRETO E RETORNA O CICLO MODELO DESEJADO.' })
  async findOne(@Param('id') id: string): Promise<CycleModel> {
    return this.cycleService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR CICLO MODELO', description: 'PASSE O ID CORRETO JUNTO DE UM BODY E RETORNA O CICLO MODELO ATUALIZADO.' })
  async update(@Param('id') id: string, @Body() cycle: CycleModel): Promise<CycleModel> {
    return this.cycleService.update(id, cycle);
  }

  @Put('materias/:id')
  async updateMaterias(@Param('id') id: string, @Body() disciplinas: any): Promise<CycleModel> {
    return this.cycleService.updateMaterias(id, disciplinas);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR CICLO MODELO', description: 'PASSE O ID CORRETO E DELETA O CICLO MODELO DESEJADO.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.cycleService.remove(id);
  }
  
}
