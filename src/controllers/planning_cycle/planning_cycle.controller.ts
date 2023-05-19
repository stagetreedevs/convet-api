/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlanningCycleService } from './planning_cycle.service';
import { PlanningCycleDto } from './planning_cycle.dto';
import { PlanningCycle } from './planning_cycle.entity';
@ApiTags('Ciclo de Planejamento')
@Controller('planningCycle')
export class PlanningCycleController {

  constructor(private readonly ciclyService: PlanningCycleService) { }

  @Post()
  @ApiOperation({ summary: 'CRIAR CICLO DE PLANEJAMENTO', description: 'PASSE O BODY PREENCHIDO E CRIE UM NOVO CICLO DE PLANEJAMENTO.' })
  @ApiBody({ type: PlanningCycleDto })
  async create(@Body() cycle: PlanningCycle): Promise<PlanningCycle> {
    return this.ciclyService.create(cycle);
  }

  @Get()
  @ApiOperation({ summary: 'TODOS CICLOS DE PLANEJAMENTO', description: 'RETORNA TODAS OS CICLOS DE PLANEJAMENTO DO SISTEMA.' })
  async findAll(): Promise<PlanningCycle[]> {
    return this.ciclyService.findAll();
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'BUSCAR CICLOS DE PLANEJAMENTO DE UM USUÁRIO ESPECÍFICO, PASSANDO SEU ID', description: 'PASSE O ID DO USUÁRIO E RETORNA O CICLOS DE PLANEJAMENTO DO MESMO.' })
  async findUser(@Param('id') id: string): Promise<PlanningCycle[]> {
    return this.ciclyService.findUser(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR CICLO DE PLANEJAMENTO ID', description: 'PASSE O ID CORRETO E RETORNA O CICLO DE PLANEJAMENTO DESEJADO.' })
  async findOne(@Param('id') id: string): Promise<PlanningCycle> {
    return this.ciclyService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR CICLO DE PLANEJAMENTO', description: 'PASSE O ID CORRETO JUNTO DE UM BODY E RETORNA O CICLO DE PLANEJAMENTO ATUALIZADO.' })
  async update(@Param('id') id: string, @Body() cycle: PlanningCycle): Promise<PlanningCycle> {
    return this.ciclyService.update(id, cycle);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR CICLO DE PLANEJAMENTO', description: 'PASSE O ID CORRETO E DELETA O CICLO DE PLANEJAMENTO DESEJADO.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.ciclyService.remove(id);
  }
}
