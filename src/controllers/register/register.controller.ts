/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';
import { Register } from './register.entity';
interface PartialRegister {
  type_school_subject: string;
  duration: string;
}
@ApiTags('Registro')
@Controller('registro')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) { }

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

  @Get('user/:id')
  @ApiOperation({ summary: 'BUSCAR REGISTROS DE UM USUÁRIO ESPECÍFICO, PASSANDO SEU ID', description: 'PASSE O ID DO USUÁRIO E RETORNA OS REGISTROS DO MESMO.' })
  async findUser(@Param('id') id: string): Promise<Register[]> {
    return this.registerService.findUser(id);
  }

  @Get('all/:user_id')
  @ApiOperation({ summary: 'RETORNA TODAS HORAS REGISTRADAS NO SISTEMA', description: 'PASSE O ID DO USUÁRIO E RETORNA O TEMPO DE DURAÇÃO DE ESTUDO PARA CADA TIPO DE REGISTRO.' })
  async getAllHours(@Param('user_id') user_id: string): Promise<PartialRegister[]> {
    const hours = await this.registerService.allHours(user_id);
    return hours;
  }

  @Get('times/:user_id/:materia')
  @ApiOperation({ summary: 'RETORNA TEMPO MÉDIO DAS QUESTÕES', description: 'PASSE O ID DO USUÁRIO E O NOME DA MATÉRIA.' })
  async getAverageTime(
    @Param('user_id') user_id: string,
    @Param('materia') materia: string,
  ): Promise<any[]> {
    return this.registerService.averageTime(user_id, materia);
  }

  @Get('year/:user_id')
  @ApiOperation({ summary: 'RETORNA TODAS HORAS REGISTRADAS NO ANO ATUAL', description: 'PASSE O ID DO USUÁRIO E RETORNA O TEMPO DE DURAÇÃO DE ESTUDO PARA CADA TIPO DE REGISTRO.' })
  async getEverYear(@Param('user_id') user_id: string): Promise<PartialRegister[]> {
    const hours = await this.registerService.everYear(user_id);
    return hours;
  }

  @Get('month/:user_id')
  @ApiOperation({ summary: 'RETORNA TODAS HORAS REGISTRADAS NO MÊS ATUAL', description: 'PASSE O ID DO USUÁRIO E RETORNA O TEMPO DE DURAÇÃO DE ESTUDO PARA CADA TIPO DE REGISTRO.' })
  async getCurrentMonth(@Param('user_id') user_id: string): Promise<PartialRegister[]> {
    const hours = await this.registerService.currentMonth(user_id);
    return hours;
  }

  @Get('week/:user_id')
  @ApiOperation({ summary: 'RETORNA TODAS HORAS REGISTRADAS NA SEMANA ATUAL', description: 'PASSE O ID DO USUÁRIO E RETORNA O TEMPO DE DURAÇÃO DE ESTUDO PARA CADA TIPO DE REGISTRO.' })
  async getCurrentWeek(@Param('user_id') user_id: string): Promise<PartialRegister[]> {
    const hours = await this.registerService.currentWeek(user_id);
    return hours;
  }

  @Get('day/:user_id')
  @ApiOperation({ summary: 'RETORNA TODAS HORAS REGISTRADAS NO DIA ATUAL', description: 'PASSE O ID DO USUÁRIO E RETORNA O TEMPO DE DURAÇÃO DE ESTUDO PARA CADA TIPO DE REGISTRO.' })
  async getCurrentDay(@Param('user_id') user_id: string): Promise<PartialRegister[]> {
    const hours = await this.registerService.currentDay(user_id);
    return hours;
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
