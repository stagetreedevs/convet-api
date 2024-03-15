/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { add } from 'date-fns';
import { Register } from './register.entity';
import { RegisterQuestionsService } from './register-questions.service';

@Injectable()
export class RegisterTimesService {
    constructor(
        @InjectRepository(Register) private readonly regRepository: Repository<Register>,
        private readonly questionService: RegisterQuestionsService
    ) { }

    async totalTime(user_id: string, code: string): Promise<string> {
        const verify = await this.regRepository.createQueryBuilder("register")
            .select("SUM(EXTRACT(EPOCH FROM register.duration))", "total_duration")
            .where("register.user = :user_id", { user_id })
            .andWhere("register.school_subject_code = :code", { code })
            .getRawOne();

        const totalDurationSeconds = verify.total_duration;
        const totalDurationHours = Math.floor(totalDurationSeconds / 3600);
        const totalDurationMinutes = Math.floor((totalDurationSeconds % 3600) / 60);
        const totalDurationSecondsRemainder = Math.floor(totalDurationSeconds % 60);

        const totalTimeFormatted = `${totalDurationHours.toString().padStart(2, '0')}:${totalDurationMinutes.toString().padStart(2, '0')}:${totalDurationSecondsRemainder.toString().padStart(2, '0')}`;

        return totalTimeFormatted;
    }

    async dayTimeByCode(user_id: string, code: string): Promise<any[]> {
        const registros = await this.regRepository.find({
            where: {
                user: user_id,
                school_subject_code: code
            },
            select: [
                'start_date',
                'duration'
            ],
            order: {
                start_date: 'ASC'
            }
        });

        // Criar um mapa para armazenar a soma das durações para cada start_date
        const somaDuracoesPorData = new Map<string, Date>();

        // Iterar sobre os registros e somar as durações correspondentes
        registros.forEach(registro => {
            const { start_date, duration } = registro;
            const durationInSeconds = this.durationToSeconds(duration); // Converter a duração para segundos
            const existingDuration = somaDuracoesPorData.get(start_date.toString()) || new Date(0, 0, 0, 0, 0, 0);
            const updatedDuration = add(existingDuration, { seconds: durationInSeconds });
            somaDuracoesPorData.set(start_date.toString(), updatedDuration);
        });

        // Formatar os resultados para o formato desejado
        const resultados = Array.from(somaDuracoesPorData).map(([start_date, totalDuration]) => ({
            start_date,
            duration: this.formatDuration(totalDuration) // Converter a soma de segundos para o formato de duração
        }));

        return this.transformData(resultados);
    }

    async weekTimeByCode(user: string, code: string): Promise<any> {
        const registros = await this.regRepository.find({
            where: {
                user,
                school_subject_code: code,
            },
            select: [
                'start_date',
                'duration'
            ],
            order: {
                start_date: 'ASC'
            }
        });

        const first_date = registros[0].start_date;
        const last_date = registros[(registros.length - 1)].start_date;

        const weeks = this.questionService.getWeeksInRange(first_date, last_date);

        // Agrupar registros por semana com indicador de semana
        const groupedRegisters = weeks.map(week => {
            const weekRegister = registros.filter(registro => {
                const registroDate = new Date(registro.start_date);
                const startDate = new Date(week.split(' - ')[0]);
                const endDate = new Date(week.split(' - ')[1]);
                return registroDate >= startDate && registroDate <= endDate;
            });
            return { week, registers: weekRegister };
        });

        const registerInSeconds = this.registerDurationInSeconds(groupedRegisters);

        const registerSumByDays = await this.sumWeeksByStartDate(registerInSeconds);

        const semanas = this.calculateSumByWeeks(registerSumByDays);

        const semanas_convertidas = this.convertDurationsWeekToHms(semanas);

        return this.questionService.transformWeekRegisters(semanas_convertidas);
    }

    async monthTimeByCode(user: string, code: string): Promise<any> {
        const registros = await this.regRepository.find({
            where: {
                user,
                school_subject_code: code,
            },
            select: [
                'start_date',
                'duration'
            ],
            order: {
                start_date: 'ASC'
            }
        });

        const first_date = registros[0].start_date;
        const last_date = registros[(registros.length - 1)].start_date;

        const weeks = this.questionService.getWeeksInRange(first_date, last_date);

        // Agrupar registros por semana com indicador de semana
        const groupedRegisters = weeks.map(week => {
            const weekRegister = registros.filter(registro => {
                const registroDate = new Date(registro.start_date);
                const startDate = new Date(week.split(' - ')[0]);
                const endDate = new Date(week.split(' - ')[1]);
                return registroDate >= startDate && registroDate <= endDate;
            });
            return { week, registers: weekRegister };
        });

        const registerInSeconds = this.registerDurationInSeconds(groupedRegisters);

        const registerSumByDay = this.sumDurationsWithSameStartDate(registerInSeconds);

        const organization_response = this.questionService.organizeByYearMonth(registerSumByDay);

        const meses = this.calculateSumByMonth(organization_response);

        return this.convertDurationsToHms(meses);
    }

    async yearTimeByCode(user_id: string, code: string): Promise<any[]> {
        const registros = await this.regRepository.find({
            where: {
                user: user_id,
                school_subject_code: code
            },
            select: [
                'start_date',
                'duration'
            ],
            order: {
                start_date: 'ASC'
            }
        });

        // Criar um mapa para armazenar a soma das durações para cada start_date
        const somaDuracoesPorAnoMes = new Map<string, Date>();

        // Iterar sobre os registros e somar as durações correspondentes
        registros.forEach(registro => {
            const { start_date, duration } = registro;
            const yearMonth = start_date.toString().substring(0, 7); // Obtém o ano e mês da data de início
            const durationInSeconds = this.durationToSeconds(duration); // Converter a duração para segundos
            const existingDuration = somaDuracoesPorAnoMes.get(yearMonth) || new Date(0, 0, 0, 0, 0, 0);
            const updatedDuration = add(existingDuration, { seconds: durationInSeconds });
            somaDuracoesPorAnoMes.set(yearMonth, updatedDuration);
        });

        // Formatar os resultados para o formato desejado
        const resultados = Array.from(somaDuracoesPorAnoMes).map(([yearMonth, totalDuration]) => ({
            start_date: yearMonth,
            duration: this.formatDuration(totalDuration) // Converter a soma de segundos para o formato de duração
        }));

        return this.transformDataMonth(resultados);
    }

    async totalTimeByCode(user_id: string, code: string): Promise<any[]> {
        const registros = await this.regRepository.find({
            where: {
                user: user_id,
                school_subject_code: code
            },
            select: [
                'start_date',
                'duration'
            ],
            order: {
                start_date: 'ASC'
            }
        });

        // Criar um mapa para armazenar a soma das durações para cada start_date
        const somaDuracoesPorAno = new Map<string, Date>();

        // Iterar sobre os registros e somar as durações correspondentes
        registros.forEach(registro => {
            const { start_date, duration } = registro;
            const year = start_date.toString().substring(0, 4); // Obtém o ano e mês da data de início
            const durationInSeconds = this.durationToSeconds(duration); // Converter a duração para segundos
            const existingDuration = somaDuracoesPorAno.get(year) || new Date(0, 0, 0, 0, 0, 0);
            const updatedDuration = add(existingDuration, { seconds: durationInSeconds });
            somaDuracoesPorAno.set(year, updatedDuration);
        });

        // Formatar os resultados para o formato desejado
        const resultados = Array.from(somaDuracoesPorAno).map(([year, totalDuration]) => ({
            start_date: year,
            duration: this.formatDuration(totalDuration) // Converter a soma de segundos para o formato de duração
        }));

        return this.transformDataYear(resultados);
    }

    // Função para converter duração no formato HH:mm:ss para segundos
    durationToSeconds(duration: string): number {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }

    // Função para formatar a duração
    formatDuration(duration: Date): string {
        return `${String(duration.getHours()).padStart(2, '0')}:${String(duration.getMinutes()).padStart(2, '0')}:${String(duration.getSeconds()).padStart(2, '0')}`;
    }

    transformData(inputData: any[]): any[] {
        return inputData.map(item => {
            const { start_date, ...rest } = item;
            const [year, month] = start_date.split('-');
            return {
                month: `${year}-${month}`,
                year: parseInt(year),
                start_date,
                ...rest,
            };
        });
    }

    transformDataMonth(inputData: any[]): any[] {
        return inputData.map(item => {
            const { start_date, ...rest } = item;
            const [year, month] = start_date.split('-');
            return {
                year: parseInt(year),
                month: `${year}-${month}`,
                ...rest,
            };
        });
    }

    transformDataYear(inputData: any[]): any[] {
        return inputData.map(item => {
            const { start_date, ...rest } = item;
            const [year] = start_date.split('-');
            return {
                year: parseInt(year),
                ...rest,
            };
        });
    }

    registerDurationInSeconds(data) {
        data.forEach(registro => {
            if (registro.registers.length > 0) {
                for (const regs of registro.registers) {
                    const durationInSeconds = this.durationToSeconds(regs.duration); // Converter a duração para segundos
                    regs.duration = durationInSeconds;
                }
            }
        });

        return data;
    }

    sumDurationsWithSameStartDate(registros: any[]) {
        const somaPorSemana = {};

        registros.forEach(registro => {
            const semana = registro.week;

            // Verifica se a semana já está presente no objeto de somaPorSemana
            if (!somaPorSemana[semana]) {
                somaPorSemana[semana] = { duration: 0 };
            }

            // Percorre os registros dentro da semana e adiciona as quantidades
            registro.registers.forEach(registroSemana => {
                somaPorSemana[semana].duration += parseInt(registroSemana.duration);
            });
        });

        return somaPorSemana;
    }

    calculateSumByMonth(months: any[]): any[] {
        const result: any[] = [];

        for (const month of months) {
            const month_duration = month.weeks.reduce((acc: number, week: any) => acc + week.duration, 0);

            const updatedWeeks = month.weeks.map((week: any) => {
                return {
                    ...week
                };
            });

            result.push({
                month: month.month,
                month_duration,
                weeks: updatedWeeks,
            });
        }

        return result;
    }

    sumWeeksByStartDate(registros: any) {
        const somaPorSemana: any[] = [];

        registros.forEach(semana => {
            const registrosSemana = semana.registers;
            const soma = registrosSemana.reduce((acc, registro) => {
                if (!acc[registro.start_date]) {
                    acc[registro.start_date] = { duration: 0 };
                }
                acc[registro.start_date].duration += parseInt(registro.duration, 10);
                return acc;
            }, {});

            somaPorSemana.push({
                week: semana.week,
                registers: soma
            });
        });

        return somaPorSemana;
    }

    calculateSumByWeeks(weeks: any[]): any[] {
        const result: any[] = [];

        for (const item of weeks) {
            const week_duration = Object.values(item.registers).reduce((acc: number, register: any) => acc + register.duration, 0);
            result.push({
                ...item,
                week_duration
            });
        }

        return result;
    }

    secondsToHms(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
    }

    pad(num: number): string {
        return num < 10 ? `0${num}` : num.toString();
    }

    convertDurationsToHms(data: any[]): any[] {
        const convertedData = data.map(month => ({
            month: month.month,
            month_duration: this.secondsToHms(month.month_duration),
            weeks: month.weeks.map(week => ({
                week: week.week,
                duration: this.secondsToHms(week.duration),
            })),
        }));

        return convertedData;
    }

    convertDurationsWeekToHms(data: any[]): any[] {
        const convertedData = data.map(week => ({
            week: week.week,
            registers: Object.keys(week.registers).reduce((acc, registerDate) => {
                acc[registerDate] = {
                    duration: this.secondsToHms(week.registers[registerDate].duration),
                };
                return acc;
            }, {}),
            week_duration: this.secondsToHms(week.week_duration),
        }));

        return convertedData;
    }

}