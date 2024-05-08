/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterTimesService } from './register-times.service';
@ApiTags('Dashboard - Tempo médio')
@Controller('dashboard/times')
export class RegisterTimesController {

    constructor(private readonly registerService: RegisterTimesService) { }

    @Get(':user_id/:code/total')
    @ApiOperation({ summary: 'TOTAL - GRÁFICO TEMPO MÉDIO VIA CÓDIGO' })
    async totalTimeByCode(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<any> {
        const years = await this.registerService.totalTimeByCode(user_id, code);
        const total = await this.registerService.totalTime(user_id, code);

        return {
            total_duration: total,
            years
        }
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
        const month = await this.registerService.monthTimeByCode(user_id, code);
        const monthArray = month.filter(mes => mes.month_duration != "00:00:00");
        const filteredArray = monthArray.map(item => ({
            ...item,
            weeks: item.weeks.filter(week => week.duration != "00:00:00")
        }));
        return filteredArray;
    }

    @Get(':user_id/:code/week')
    @ApiOperation({ summary: 'SEMANA - GRÁFICO TEMPO MÉDIO VIA CÓDIGO' })
    async weekTimeByCode(
        @Param('user_id') user_id: string,
        @Param('code') code: string,
    ): Promise<any[]> {
        const weekArray = await this.registerService.weekTimeByCode(user_id, code);
        const filteredArray = weekArray.filter(week => week.week_duration != "00:00:00");
        return filteredArray;
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