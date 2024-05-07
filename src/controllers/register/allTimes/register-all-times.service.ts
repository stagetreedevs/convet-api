/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cycle } from '../../cycle/cycle.entity';
import { RegisterTimesService } from '../times/register-times.service';

@Injectable()
export class RegisterAllTimesService {
    constructor(
        @InjectRepository(Cycle) private readonly cycleService: Repository<Cycle>,
        private readonly timesService: RegisterTimesService
    ) { }

    async totalTime(user: string) {
        const ciclo = await this.cycleService.findOne({ where: { user } });

        const codesSet = new Set<string>();
        const disciplinas = [];

        ciclo.materias.forEach((materia: any) => {
            if (!codesSet.has(materia.code)) {
                codesSet.add(materia.code);
                disciplinas.push({ code: materia.code, name: materia.name });
            }
        });

        const resolve = [];

        for (const materia of disciplinas) {
            const objeto = {
                materia: materia.name,
                code: materia.code,
                years: await this.timesService.totalTimeByCode(user, materia.code),
                total: await this.timesService.totalTime(user, materia.code),
            }
            resolve.push(objeto);
        }

        return resolve;
    }

    async yearTime(user: string) {
        const ciclo = await this.cycleService.findOne({ where: { user } });

        const codesSet = new Set<string>();
        const disciplinas = [];

        ciclo.materias.forEach((materia: any) => {
            if (!codesSet.has(materia.code)) {
                codesSet.add(materia.code);
                disciplinas.push({ code: materia.code, name: materia.name });
            }
        });

        const resolve = [];

        for (const materia of disciplinas) {
            const objeto = {
                materia: materia.name,
                code: materia.code,
                data: await this.timesService.yearTimeByCode(user, materia.code)
            }
            resolve.push(objeto);
        }

        return resolve;
    }

    async monthTime(user: string) {
        const ciclo = await this.cycleService.findOne({ where: { user } });

        const codesSet = new Set<string>();
        const disciplinas = [];

        ciclo.materias.forEach((materia: any) => {
            if (!codesSet.has(materia.code)) {
                codesSet.add(materia.code);
                disciplinas.push({ code: materia.code, name: materia.name });
            }
        });

        const resolve = [];

        for (const materia of disciplinas) {
            const objeto = {
                materia: materia.name,
                code: materia.code,
                data: await this.timesService.monthTimeByCode(user, materia.code)
            }
            resolve.push(objeto);
        }

        return resolve;
    }

    async weekTime(user: string) {
        const ciclo = await this.cycleService.findOne({ where: { user } });

        const codesSet = new Set<string>();
        const disciplinas = [];

        ciclo.materias.forEach((materia: any) => {
            if (!codesSet.has(materia.code)) {
                codesSet.add(materia.code);
                disciplinas.push({ code: materia.code, name: materia.name });
            }
        });

        const resolve = [];

        for (const materia of disciplinas) {
            const objeto = {
                materia: materia.name,
                code: materia.code,
                data: await this.timesService.weekTimeByCode(user, materia.code)
            }
            resolve.push(objeto);
        }

        return resolve;
    }

    async dayTime(user: string) {
        const ciclo = await this.cycleService.findOne({ where: { user } });

        const codesSet = new Set<string>();
        const disciplinas = [];

        ciclo.materias.forEach((materia: any) => {
            if (!codesSet.has(materia.code)) {
                codesSet.add(materia.code);
                disciplinas.push({ code: materia.code, name: materia.name });
            }
        });

        const resolve = [];

        for (const materia of disciplinas) {
            const objeto = {
                materia: materia.name,
                code: materia.code,
                data: await this.timesService.dayTimeByCode(user, materia.code)
            }
            resolve.push(objeto);
        }

        return resolve;
    }
}