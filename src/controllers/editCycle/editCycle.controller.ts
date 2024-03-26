/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EditCycleService } from './editCycle.service';
@ApiTags('Salvar Edição - Ciclo Individual')
@Controller('editCycle')
export class EditCycleController {

    constructor(private readonly editModelService: EditCycleService) { }

    @Post()
    @ApiOperation({ summary: 'SALVAR EDIÇÃO DO CICLO' })
    async create(@Body() model: any): Promise<any> {
        return this.editModelService.create(model);
    }

    @Get()
    @ApiOperation({ summary: 'TODAS EDIÇÕES SALVAS' })
    async findAll(): Promise<any[]> {
        return this.editModelService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'BUSCAR EDIÇÃO VIA ID' })
    async findOne(@Param('id') id: string): Promise<any> {
        return this.editModelService.findOne(id);
    }

    @Get('user/:user_id')
    @ApiOperation({ summary: 'BUSCAR EDIÇÃO VIA USUÁRIO E MODELO' })
    async findByUser(
        @Param('user_id') user_id: string
    ): Promise<any> {
        return this.editModelService.findByUser(user_id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'EDITAR EDIÇÃO' })
    async update(@Param('id') id: string, @Body() model: any): Promise<any> {
        return this.editModelService.update(id, model);
    }

    @Put('materias/:id')
    @ApiOperation({ summary: 'EDITAR MATÉRIAS DE UMA EDIÇÃO' })
    async updateMaterias(@Param('id') id: string, @Body() materias: any): Promise<any> {
        return this.editModelService.updateMaterias(id, materias);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.editModelService.remove(id);
    }

}