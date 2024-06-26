/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterService } from './register.service';
import { RegQuestionDto, RegisterDto } from './register.dto';
import { Register } from './register.entity';
import { QuestionRegDto } from './question.dto';
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

  @Post('question')
  @ApiOperation({ summary: 'REGISTRAR QUESTÃO', description: 'PASSE O BODY PREENCHIDO E CRIE UM NOVO REGISTRO.' })
  @ApiBody({ type: QuestionRegDto })
  async createQuestion(@Body() question: any): Promise<Register> {
    return this.registerService.createQuestion(question);
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

  @Get('user/:userId/:subjectId')
  @ApiOperation({ summary: 'INFORMAÇÃO SE O CARD ESTÁ FINALIZADO' })
  async findCycleWithUserAndSubject(@Param('userId') userId: string, @Param('subjectId') subjectId: string): Promise<any> {
    return this.registerService.findCycleWithUserAndSubject(userId, subjectId);
  }

  @Put('user/:userId/restart')
  @ApiOperation({ summary: 'REINICIA O CICLO' })
  async restartCycleRegister(@Param('userId') userId: string): Promise<any> {
    return this.registerService.restartCycleRegister(userId);
  }

  @Get('all/:user_id')
  @ApiOperation({ summary: 'RETORNA TODAS HORAS REGISTRADAS NO SISTEMA', description: 'PASSE O ID DO USUÁRIO E RETORNA O TEMPO DE DURAÇÃO DE ESTUDO PARA CADA TIPO DE REGISTRO.' })
  async getAllHours(@Param('user_id') user_id: string): Promise<PartialRegister[]> {
    const hours = await this.registerService.allHours(user_id);
    return hours;
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

  @Get('code/:user_id/:code')
  @ApiOperation({ summary: 'REGISTRO VIA CÓDIGO', description: 'RETORNA O REGISTRO DO ALUNO REFERENTE AO CÓDIGO PASSADO.' })
  async findByCode(@Param('user_id') user_id: string, @Param('code') code: string): Promise<any> {
    return this.registerService.findByCode(user_id, code);
  }

  @Get('times/:user_id/sum')
  @ApiOperation(
    { 
      summary: 'SOMA DE TODAS AS HORAS DO USUÁRIO', 
      description: 'RETORNA A SOMA DE TODAS AS HORAS REGISTRADAS PELO USUÁRIO.' 
    })
  async totalUserTime(
    @Param('user_id') user_id: string
  ): Promise<any> {
    return this.registerService.totalUserTime(user_id);
  }

  @Get('questions/:user_id')
  @ApiOperation({ summary: 'QUESTÕES VIA ID DO USUÁRIO', description: 'RETORNA UM RESUMO DE TODAS AS QUESTÕES REGISTRADAS PELO USUÁRIO.' })
  async findForQuestion(@Param('user_id') user_id: string): Promise<any> {
    return this.registerService.findForQuestion(user_id);
  }

  @Get('questions/:user_id/sum')
  @ApiOperation({ summary: 'SOMA DE TODAS AS QUESTÕES DO USUÁRIO', description: 'RETORNA A SOMA DE TODAS AS QUESTÕES REGISTRADAS PELO USUÁRIO.' })
  async numberOfQuestions(@Param('user_id') user_id: string): Promise<any> {
    return this.registerService.numberOfQuestions(user_id);
  }

  /*
      QUESTÕES
  */

  @Get('question/all/:user_id/:code')
  @ApiOperation({ summary: 'RETORNA DADOS DE TODAS QUESTÕES', description: 'PASSE COMO PARÂMETROS ID DO USUÁRIO E O CÓDIGO DA MATÉRIA PARA OBTER OS DADOS.' })
  async getAll(@Param('user_id') user_id: string, @Param('code') code: string): Promise<any[]> {
    const hours = await this.registerService.allAnswers(user_id, code);
    return hours;
  }

  @Get('question/year/:user_id/:code')
  @ApiOperation({ summary: 'RETORNA DADOS DE TODAS QUESTÕES DO ANO ATUAL', description: 'PASSE COMO PARÂMETROS ID DO USUÁRIO E O CÓDIGO DA MATÉRIA PARA OBTER OS DADOS.' })
  async getYear(@Param('user_id') user_id: string, @Param('code') code: string): Promise<any[]> {
    const hours = await this.registerService.yearAnswers(user_id, code);
    return hours;
  }

  @Get('question/month/:user_id/:code')
  @ApiOperation({ summary: 'RETORNA DADOS DE TODAS QUESTÕES DO MÊS ATUAL', description: 'PASSE COMO PARÂMETROS ID DO USUÁRIO E O CÓDIGO DA MATÉRIA PARA OBTER OS DADOS.' })
  async getMonth(@Param('user_id') user_id: string, @Param('code') code: string): Promise<any[]> {
    const hours = await this.registerService.monthAnswers(user_id, code);
    return hours;
  }

  @Get('question/week/:user_id/:code')
  @ApiOperation({ summary: 'RETORNA DADOS DE TODAS QUESTÕES DA SEMANA ATUAL', description: 'PASSE COMO PARÂMETROS ID DO USUÁRIO E O CÓDIGO DA MATÉRIA PARA OBTER OS DADOS.' })
  async getWeek(@Param('user_id') user_id: string, @Param('code') code: string): Promise<any[]> {
    const hours = await this.registerService.weekAnswers(user_id, code);
    return hours;
  }

  @Get('question/day/:user_id/:code')
  @ApiOperation({ summary: 'RETORNA DADOS DE TODAS QUESTÕES DO DIA ATUAL', description: 'PASSE COMO PARÂMETROS ID DO USUÁRIO E O CÓDIGO DA MATÉRIA PARA OBTER OS DADOS.' })
  async getDay(@Param('user_id') user_id: string, @Param('code') code: string): Promise<any[]> {
    const hours = await this.registerService.dayAnswers(user_id, code);
    return hours;
  }

  //NO CODE

  @Get('questions/alltime/:user_id')
  @ApiOperation({ summary: 'RETORNA O TEMPO TOTAL GASTO EM TODAS AS QUESTÕES' })
  async questionTotalTime(
    @Param('user_id') user_id: string,
  ): Promise<string> {
    return this.registerService.questionTotalTime(user_id);
  }

  @Get('questions/averagetime/:user_id')
  @ApiOperation({ summary: 'RETORNA TEMPO MÉDIO GASTO EM TODAS AS QUESTÕES' })
  async questionAvarageTime(
    @Param('user_id') user_id: string,
  ): Promise<any[]> {
    return this.registerService.questionAvarageTime(user_id);
  }

  @Get('questions/all/:user_id')
  @ApiOperation({ summary: 'RETORNA A SOMA DE TODAS QUESTÕES NO ANO ATUAL' })
  async questionsPerSystem(@Param('user_id') user_id: string): Promise<any[]> {
    const hours = await this.registerService.questionsPerSystem(user_id);
    return hours;
  }

  @Get('questions/year/:user_id')
  @ApiOperation({ summary: 'RETORNA A SOMA DE TODAS QUESTÕES NO ANO ATUAL' })
  async questionsPerYear(@Param('user_id') user_id: string): Promise<any[]> {
    const hours = await this.registerService.questionsPerYear(user_id);
    return hours;
  }

  @Get('questions/month/:user_id')
  @ApiOperation({ summary: 'RETORNA A SOMA DE TODAS QUESTÕES DO MÊS ATUAL' })
  async questionsPerMonth(@Param('user_id') user_id: string): Promise<any[]> {
    const hours = await this.registerService.questionsPerMonth(user_id);
    return hours;
  }

  @Get('questions/week/:user_id')
  @ApiOperation({ summary: 'RETORNA A SOMA DE TODAS QUESTÕES DA SEMANA ATUAL' })
  async questionsPerWeek(@Param('user_id') user_id: string): Promise<any[]> {
    const hours = await this.registerService.questionsPerWeek(user_id);
    return hours;
  }

  @Get('questions/day/:user_id')
  @ApiOperation({ summary: 'RETORNA A SOMA DE TODAS QUESTÕES DO DIA ATUAL' })
  async questionsPerDay(@Param('user_id') user_id: string): Promise<any[]> {
    const hours = await this.registerService.questionsPerDay(user_id);
    return hours;
  }

  /*
    QUESTÕES
  */

  @Get('dashboard/questions/:user_id')
  @ApiOperation({ summary: 'DASHBOARD QUESTÕES POR MATÉRIAS' })
  async dashboardQuestion(@Param('user_id') user_id: string): Promise<any[]> {
    return await this.registerService.dashboardQuestion(user_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'BUSCAR REGISTRO ID', description: 'PASSE O ID CORRETO E RETORNA O REGISTRO DESEJADO.' })
  async findOne(@Param('id') id: string): Promise<Register> {
    return this.registerService.findOne(id);
  }

  @Get(':user_id/:code')
  @ApiOperation({ summary: 'REGISTROS MATÉRIAS ALUNO', description: 'PASSE O ID DO USUÁRIO E O CODE PARA RETORNAR TODOS OS REGISTROS' })
  async findMateria(@Param('user_id') user_id: string, @Param('code') code: string): Promise<any> {
    return this.registerService.findMateria(user_id, code);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR REGISTRO', description: 'PASSE O ID CORRETO JUNTO DE UM BODY E RETORNA O REGISTRO ATUALIZADO.' })
  async update(@Param('id') id: string, @Body() register: Register): Promise<Register> {
    return this.registerService.update(id, register);
  }

  @ApiOperation({ summary: 'EDITAR REGISTRO DE QUESTÕES' })
  @ApiBody({ type: RegQuestionDto })
  @Put('questions/:user_id/:code')
  async updateQuestions(
    @Param('user_id') user_id: string,
    @Param('code') code: string,
    @Body() body: RegQuestionDto
  ): Promise<any> {
    const { qtd_questions, questions_hits } = body;
    return this.registerService.updateQuestions(user_id, code, qtd_questions, questions_hits);
  }

  // @Delete()
  // async removeAll(): Promise<void> {
  //   return this.registerService.removeAll();
  // }

  @Delete('questions/:user_id')
  @ApiOperation({ summary: 'DELETAR TODOS LANÇAMENTOS DE QUESTÕES' })
  async deleteAllQuestions(@Param('user_id') user_id: string): Promise<void> {
    return this.registerService.deleteAllQuestions(user_id);
  }

  @Delete('questions/:user_id/:code')
  @ApiOperation({ summary: 'DELETAR LANÇAMENTOS DE QUESTÕES VIA CÓDIGO DA MATÉRIA' })
  async deleteForCodeQuestions(
    @Param('user_id') user_id: string,
    @Param('code') code: string,
  ): Promise<void> {
    return this.registerService.deleteForCodeQuestions(user_id, code);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETAR REGISTRO', description: 'PASSE O ID CORRETO E DELETA O REGISTRO DESEJADO.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.registerService.remove(id);
  }
}
