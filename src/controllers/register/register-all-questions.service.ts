/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cycle } from '../cycle/cycle.entity';
import { RegisterQuestionsService } from './register-questions.service';
@Injectable()
export class RegisterAllQuestionsService {
    constructor(
        @InjectRepository(Cycle) private readonly cycleService: Repository<Cycle>,
        private readonly registerQuestionService: RegisterQuestionsService
    ) { }

    async totalQuestions(user: string) {
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
            const total = await this.registerQuestionService.totalQuesionsByCode(user, materia.code);
            total.materia = materia.name;
            total.code = materia.code;
            resolve.push(total);
        }

        return resolve.filter(item => item.sumQtdQuestions !== 0 && item.sumQuestionsHits !== 0);
    }

    async yearQuestions(user: string) {
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
            const total = await this.registerQuestionService.yearQuestionsByCode(user, materia.code);
            total.materia = materia.name;
            total.code = materia.code;
            resolve.push(total);
        }

        return resolve.filter(item => item.sumQtdQuestions !== 0 && item.sumQuestionsHits !== 0);
    }

    async monthQuestions(user: string) {
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
            const total = await this.registerQuestionService.monthQuestionsByCode(user, materia.code);
            if (total.length > 0) {
                const json = {
                    materia: materia.name,
                    code: materia.code,
                    data: total
                }
                resolve.push(json);
            }
        }

        return resolve;
    }

    async weekQuestions(user: string) {
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
            const total = await this.registerQuestionService.weekQuestionsByCode(user, materia.code);
            if (total.length > 0) {
                const json = {
                    materia: materia.name,
                    code: materia.code,
                    data: total
                }
                resolve.push(json);
            }
        }

        return resolve;
    }

    async dayQuestions(user: string) {
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
            const total = await this.registerQuestionService.dayQuestionsByCode(user, materia.code);
            if (total.length > 0) {
                const json = {
                    materia: materia.name,
                    code: materia.code,
                    data: total
                }
                resolve.push(json);
            }
        }

        return resolve;
    }

}