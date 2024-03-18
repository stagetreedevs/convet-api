/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EditModelService } from './editModel.service';
@ApiTags('Salvar Edição')
@Controller('editModel')
export class EditModelController {

    constructor(private readonly editModelService: EditModelService) { }

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

    @Get(':user_id/:model_id')
    @ApiOperation({ summary: 'BUSCAR EDIÇÃO VIA USUÁRIO E MODELO' })
    async findByUserModel(
        @Param('user_id') user_id: string,
        @Param('model_id') model_id: string
    ): Promise<any> {
        return this.editModelService.findByUserModel(user_id, model_id);
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
