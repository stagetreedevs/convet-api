/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlanningService } from './planning.service';
import { PlanningDto } from './planning.dto';
import { Planning } from './planning.entity';
@ApiTags('Planejamento')
@Controller('planning')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) { }

  @Post()
  @ApiOperation({ summary: 'CRIAR PLANEJAMENTO', description: 'PASSE O BODY PREENCHIDO E CRIE UM NOVO PLANEJAMENTO.' })
  @ApiBody({ type: PlanningDto })
  async create(@Body() planning: Planning): Promise<Planning> {
    return this.planningService.create(planning);
  }

  @Get()
  @ApiOperation({ summary: 'TODOS PLANEJAMENTOS', description: 'RETORNA TODAS OS PLANEJAMENTOS DO SISTEMA.' })
  async findAll(): Promise<Planning[]> {
    return this.planningService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR PLANEJAMENTO ID', description: 'PASSE O ID CORRETO E RETORNA O PLANEJAMENTO DESEJADO.' })
  async findOne(@Param('id') id: string): Promise<Planning> {
    return this.planningService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR PLANEJAMENTO', description: 'PASSE O ID CORRETO JUNTO DE UM BODY E RETORNA O PLANEJAMENTO ATUALIZADO.' })
  async update(@Param('id') id: string, @Body() planning: Planning): Promise<Planning> {
    return this.planningService.update(id, planning);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR PLANEJAMENTO', description: 'PASSE O ID CORRETO E DELETA O PLANEJAMENTO DESEJADO.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.planningService.remove(id);
  }
}
