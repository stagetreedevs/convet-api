/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CycleService } from './cycle.service';
import { CycleDto } from './cycle.dto';
import { Cycle } from './cycle.entity';
@ApiTags('Ciclo Individual')
@Controller('ciclo')
export class CycleController {

  constructor(private readonly cycleService: CycleService) { }

  @Post()
  @ApiOperation({ summary: 'CRIAR CICLO INDIVIDUAL', description: 'PASSE O BODY PREENCHIDO E CRIE UM NOVO CICLO INDIVIDUAL.' })
  @ApiBody({ type: CycleDto })
  async create(@Body() cycle: Cycle): Promise<Cycle> {
    return this.cycleService.create(cycle);
  }

  @Get()
  @ApiOperation({ summary: 'TODOS CICLOS INDIVIDUAL', description: 'RETORNA TODAS OS CICLOS INDIVIDUAL DO SISTEMA.' })
  async findAll(): Promise<Cycle[]> {
    return this.cycleService.findAll();
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'BUSCAR CICLOS INDIVIDUAL DE UM USUÁRIO ESPECÍFICO, PASSANDO SEU ID', description: 'PASSE O ID DO USUÁRIO E RETORNA O CICLOS INDIVIDUAL DO MESMO.' })
  async findUser(@Param('id') id: string): Promise<Cycle[]> {
    return this.cycleService.findUser(id);
  }

  @Get('user/materias/:id')
  @ApiOperation({ summary: 'RETORNA O ARRAY DE MATÉRIAS REFERENTES AO CICLO DO USUÁRIO, PASSANDO SEU ID', description: 'PASSE O ID DO USUÁRIO E RETORNA AS MATÉRIAS DO CICLOS INDIVIDUAL DO MESMO.' })
  async userArray(@Param('id') id: string): Promise<Cycle[]> {
    return this.cycleService.userArray(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR CICLO INDIVIDUAL ID', description: 'PASSE O ID CORRETO E RETORNA O CICLO INDIVIDUAL DESEJADO.' })
  async findOne(@Param('id') id: string): Promise<Cycle> {
    return this.cycleService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR CICLO INDIVIDUAL', description: 'PASSE O ID CORRETO JUNTO DE UM BODY E RETORNA O CICLO INDIVIDUAL ATUALIZADO.' })
  async update(@Param('id') id: string, @Body() cycle: Cycle): Promise<Cycle> {
    return this.cycleService.update(id, cycle);
  }

  @Put('materias/:id')
  async updateMaterias(@Param('id') id: string, @Body() disciplinas: any): Promise<Cycle> {
    return this.cycleService.updateMaterias(id, disciplinas);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR CICLO INDIVIDUAL', description: 'PASSE O ID CORRETO E DELETA O CICLO INDIVIDUAL DESEJADO.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.cycleService.remove(id);
  }

  @Delete('user/:userId')
  async deleteByUser(@Param('userId') userId: string): Promise<void> {
    await this.cycleService.deleteByUser(userId);
  }
}
