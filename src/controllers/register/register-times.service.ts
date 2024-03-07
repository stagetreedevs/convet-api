/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { add } from 'date-fns';
import { Register } from './register.entity';

@Injectable()
export class RegisterTimesService {
    constructor(
        @InjectRepository(Register) private readonly regRepository: Repository<Register>
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

}