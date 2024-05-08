/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterQuestionsService } from './register-questions.service';
@ApiTags('Dashboard - Questões')
@Controller('dashboard/questions')
export class RegisterQuestionsController {

    constructor(private readonly registerService: RegisterQuestionsService) { }

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

    @Get('month/:user_id/:code')
    @ApiOperation({ summary: 'MÊS - GRÁFICO QUESTÕES VIA CÓDIGO' })
    async monthQuestionsByCode(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<any> {
        const month = await this.registerService.monthQuestionsByCode(user_id, code);
        const monthArray = month.filter(mes => mes.sumQtdQuestions > 0);
        const filteredArray = monthArray.map(item => ({
            ...item,
            weeks: item.weeks.filter(week => week.total_qtd_questions > 0)
        }));
        return filteredArray;
    }

    @Get('week/:user_id/:code')
    @ApiOperation({ summary: 'SEMANA - GRÁFICO QUESTÕES VIA CÓDIGO' })
    async weekQuestionsByCode(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<any> {
        const weekArray = await this.registerService.weekQuestionsByCode(user_id, code);
        const filteredArray = weekArray.filter(week => week.sumQtdQuestions > 0);
        return filteredArray;
    }

    @Get('day/:user_id/:code')
    @ApiOperation({ summary: 'DIA - GRÁFICO QUESTÕES VIA CÓDIGO' })
    async dayQuestionsByCode(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<any[]> {
        return this.registerService.dayQuestionsByCode(user_id, code);
    }

}