/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterTimesService } from './register-times.service';
@ApiTags('Dashboard - Tempo médio')
@Controller('dashboard/times')
export class RegisterTimesController {

    constructor(private readonly registerService: RegisterTimesService) { }

    @Get('total/:user_id/:code')
    @ApiOperation({ summary: 'TEMPO TOTAL DOS REGISTROS' })
    async totalTime(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<string> {
        return this.registerService.totalTime(user_id, code);
    }

    @Get(':user_id/:code/total')
    @ApiOperation({ summary: 'TOTAL - GRÁFICO TEMPO MÉDIO VIA CÓDIGO' })
    async totalTimeByCode(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<any[]> {
        return this.registerService.totalTimeByCode(user_id, code);
    }

    @Get(':user_id/:code/year')
    @ApiOperation({ summary: 'ANO - GRÁFICO TEMPO MÉDIO VIA CÓDIGO' })
    async yearTimeByCode(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<any[]> {
        return this.registerService.yearTimeByCode(user_id, code);
    }

    @Get(':user_id/:code/month')
    @ApiOperation({ summary: 'MÊS - GRÁFICO TEMPO MÉDIO VIA CÓDIGO' })
    async monthTimeByCode(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<any[]> {
        return this.registerService.monthTimeByCode(user_id, code);
    }

    @Get(':user_id/:code/week')
    @ApiOperation({ summary: 'SEMANA - GRÁFICO TEMPO MÉDIO VIA CÓDIGO' })
    async weekTimeByCode(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<any[]> {
        return this.registerService.weekTimeByCode(user_id, code);
    }

    @Get(':user_id/:code/day')
    @ApiOperation({ summary: 'DIA - GRÁFICO TEMPO MÉDIO VIA CÓDIGO' })
    async dayTimeByCode(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<any[]> {
        return this.registerService.dayTimeByCode(user_id, code);
    }

}