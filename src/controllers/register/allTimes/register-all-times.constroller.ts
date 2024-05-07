/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterAllTimesService } from './register-all-times.service';
@ApiTags('Dashboard - Tempo Médio [Todas Matérias]')
@Controller('dashboard/all_times')
export class RegisterAllTimesController {

    constructor(private readonly registerService: RegisterAllTimesService) { }

    @Get(':user_id/total')
    @ApiOperation({ summary: 'TOTAL - GRÁFICO TEMPO MÉDIO VIA CÓDIGO' })
    async totalTime(
        @Param('user_id') user_id: string
    ): Promise<any> {
        return this.registerService.totalTime(user_id);
    }

    @Get(':user_id/year')
    @ApiOperation({ summary: 'ANO - GRÁFICO TEMPO MÉDIO VIA CÓDIGO' })
    async yearTime(
        @Param('user_id') user_id: string
    ): Promise<any> {
        return this.registerService.yearTime(user_id);
    }

    @Get(':user_id/month')
    @ApiOperation({ summary: 'MÊS - GRÁFICO TEMPO MÉDIO VIA CÓDIGO' })
    async monthTime(
        @Param('user_id') user_id: string
    ): Promise<any> {
        const monthArray = await this.registerService.monthTime(user_id);
        const filteredArray = monthArray.map(item => ({
            ...item,
            data: item.data.map(month => ({
                ...month,
                weeks: month.weeks.filter(week => week.duration != "00:00:00")
            }))
        }));
        return filteredArray;
    }

    @Get(':user_id/week')
    @ApiOperation({ summary: 'SEMANA - GRÁFICO TEMPO MÉDIO VIA CÓDIGO' })
    async weekTime(
        @Param('user_id') user_id: string
    ): Promise<any> {
        const weekArray = await this.registerService.weekTime(user_id);
        const filteredArray = weekArray.map(item => ({
            ...item,
            data: item.data.filter(week => week.week_duration != "00:00:00")
        }));
        return filteredArray;
    }

    @Get(':user_id/day')
    @ApiOperation({ summary: 'DIA - GRÁFICO TEMPO MÉDIO VIA CÓDIGO' })
    async dayTime(
        @Param('user_id') user_id: string
    ): Promise<any> {
        return this.registerService.dayTime(user_id);
    }

}