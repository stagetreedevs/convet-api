/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';
import { Register } from './register.entity';
@ApiTags('Registro')
@Controller('registro')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiOperation({ summary: 'CRIAR REGISTRO', description: 'PASSE O BODY PREENCHIDO E CRIE UM NOVO REGISTRO.' })
  @ApiBody({ type: RegisterDto })
  async create(@Body() register: Register): Promise<Register> {
    return this.registerService.create(register);
  }

  @Get()
  @ApiOperation({ summary: 'TODOS REGISTROS', description: 'RETORNA TODAS OS REGISTROS DO SISTEMA.' })
  async findAll(): Promise<Register[]> {
    return this.registerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR REGISTRO ID', description: 'PASSE O ID CORRETO E RETORNA O REGISTRO DESEJADO.' })
  async findOne(@Param('id') id: string): Promise<Register> {
    return this.registerService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR REGISTRO', description: 'PASSE O ID CORRETO JUNTO DE UM BODY E RETORNA O REGISTRO ATUALIZADO.' })
  async update(@Param('id') id: string, @Body() register: Register): Promise<Register> {
    return this.registerService.update(id, register);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR REGISTRO', description: 'PASSE O ID CORRETO E DELETA O REGISTRO DESEJADO.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.registerService.remove(id);
  }
}
