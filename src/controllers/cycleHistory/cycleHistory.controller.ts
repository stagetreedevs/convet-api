/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CycleHistoryService } from './cycleHistory.service';
import { CycleHistoryDto } from './cycleHistory.dto';
import { CycleHistory } from './cycleHistory.entity';
@ApiTags('Histórico de Ciclos')
@Controller('history')
export class CycleHistoryController {

  constructor(private readonly cycleService: CycleHistoryService) { }

  @Post()
  @ApiOperation({ summary: 'SALVAR HISTÓRICO', description: 'SALVA NO BANCO UM CICLO ANTIGO' })
  @ApiBody({ type: CycleHistoryDto })
  async create(@Body() cycle: CycleHistory): Promise<CycleHistory> {
    return this.cycleService.create(cycle);
  }

  @Get()
  @ApiOperation({ summary: 'TODOS', description: 'RETORNA TODAS OS CICLOS ANTIGOS DO SISTEMA.' })
  async findAll(): Promise<CycleHistory[]> {
    return this.cycleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR POR ID', description: 'RETORNA O CICLO ANTIGO DO ID' })
  async findOne(@Param('id') id: string): Promise<CycleHistory> {
    return this.cycleService.findOne(id);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'BUSCAR POR USER_ID', description: 'RETORNA OS CICLOS ANTIGOS DO USUÁRIO' })
  async findByUser(@Param('id') id: string): Promise<CycleHistory[]> {
    return this.cycleService.findByUser(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR CICLO MODELO', description: 'PASSE O ID CORRETO E DELETA O CICLO MODELO DESEJADO.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.cycleService.remove(id);
  }

}
