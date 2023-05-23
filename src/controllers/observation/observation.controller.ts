/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObservationService } from './observation.service';
import { ObservationDto } from './observation.dto';
import { Observation } from './observation.entity';
@ApiTags('Observações')
@Controller('obs')
export class ObservationController {

  constructor(private readonly obsService: ObservationService) { }

  @Post()
  @ApiOperation({ summary: 'CRIAR OBSERVAÇÃO', description: 'PASSE O BODY PREENCHIDO E CRIE UMA NOVA OBSERVAÇÃO.' })
  @ApiBody({ type: ObservationDto })
  async create(@Body() observation: Observation): Promise<Observation> {
    return this.obsService.create(observation);
  }

  @Get()
  @ApiOperation({ summary: 'TODAS QUESTÕES', description: 'RETORNA TODAS AS QUESTÕES DO SISTEMA.' })
  async findAll(): Promise<Observation[]> {
    return this.obsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR OBSERVAÇÃO ID', description: 'PASSE O ID CORRETO E RETORNA A OBSERVAÇÃO DESEJADA.' })
  async findOne(@Param('id') id: string): Promise<Observation> {
    return this.obsService.findOne(id);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'BUSCAR OBSERVAÇÕES DE UM USUÁRIO ESPECÍFICO, PASSANDO SEU ID', description: 'PASSE O ID DO USUÁRIO E RETORNA AS OBSERVAÇÕES DO MESMO.' })
  async findUser(@Param('id') id: string): Promise<Observation[]> {
    return this.obsService.findByUser(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR OBSERVAÇÃO', description: 'PASSE O ID CORRETO JUNTO DE UM BODY E RETORNA A OBSERVAÇÃO ATUALIZADA.' })
  async update(@Param('id') id: string, @Body() observation: Observation): Promise<Observation> {
    return this.obsService.update(id, observation);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR OBSERVAÇÃO', description: 'PASSE O ID CORRETO E DELETA A OBSERVAÇÃO DESEJADA.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.obsService.remove(id);
  }
}
