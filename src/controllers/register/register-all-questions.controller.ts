/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterAllQuestionsService } from './register-all-questions.service';
@ApiTags('Dashboard - Questões [Todas Matérias]')
@Controller('dashboard/all_questions')
export class RegisterAllQuestionsController {

    constructor(private readonly registerService: RegisterAllQuestionsService) { }

    @Get('total/:user_id')
    @ApiOperation({ summary: 'TOTAL - GRÁFICO QUESTÕES VIA CÓDIGO' })
    async totalQuesions(
        @Param('user_id') user_id: string
    ): Promise<any> {
        return this.registerService.totalQuestions(user_id);
    }

    @Get('year/:user_id')
    @ApiOperation({ summary: 'ANO - GRÁFICO QUESTÕES VIA CÓDIGO' })
    async yearQuestions(
        @Param('user_id') user_id: string
    ): Promise<any> {
        return this.registerService.yearQuestions(user_id);
    }

    @Get('month/:user_id')
    @ApiOperation({ summary: 'MÊS - GRÁFICO QUESTÕES VIA CÓDIGO' })
    async monthQuestions(
        @Param('user_id') user_id: string
    ): Promise<any> {
        return this.registerService.monthQuestions(user_id);
    }

    @Get('week/:user_id')
    @ApiOperation({ summary: 'SEMANA - GRÁFICO QUESTÕES VIA CÓDIGO' })
    async weekQuestions(
        @Param('user_id') user_id: string
    ): Promise<any> {
        return this.registerService.weekQuestions(user_id);
    }

    @Get('day/:user_id')
    @ApiOperation({ summary: 'DIA - GRÁFICO QUESTÕES VIA CÓDIGO' })
    async dayQuestions(
        @Param('user_id') user_id: string
    ): Promise<any[]> {
        return this.registerService.dayQuestions(user_id);
    }
}