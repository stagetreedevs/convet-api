/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterQuestionsService } from './register-questions.service';
@ApiTags('Dashboard - Questões')
@Controller('dashboard/questions')
export class RegisterQuestionsController {

    constructor(private readonly registerService: RegisterQuestionsService) { }

    // @Get('/:date')
    // async getWeeksOfYear(
    //     @Param('date') date: string
    // ): Promise<any> {
    //     return this.registerService.getWeeksOfMonth(date);
    // }

    @Get('total/:user_id/:code')
    @ApiOperation({ summary: 'TOTAL - GRÁFICO QUESTÕES VIA CÓDIGO' })
    async totalQuesionsByCode(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<any> {
        return this.registerService.totalQuesionsByCode(user_id, code);
    }

    @Get('year/:user_id/:code')
    @ApiOperation({ summary: 'ANO - GRÁFICO QUESTÕES VIA CÓDIGO' })
    async yearQuestionsByCode(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<any> {
        return this.registerService.yearQuestionsByCode(user_id, code);
    }

    //Mês

    //Semana

    @Get('day/:user_id/:code')
    @ApiOperation({ summary: 'DIA - GRÁFICO QUESTÕES VIA CÓDIGO' })
    async dayQuestionsByCode(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<any[]> {
        return this.registerService.dayQuestionsByCode(user_id, code);
    }

}