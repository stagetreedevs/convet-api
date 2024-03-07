/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Register } from './register.entity';
import { eachWeekOfInterval, endOfMonth, startOfMonth } from 'date-fns';

@Injectable()
export class RegisterQuestionsService {
    constructor(
        @InjectRepository(Register) private readonly regRepository: Repository<Register>,
    ) { }

    async totalQuesionsByCode(user: string, code: string): Promise<any> {
        const registros = await this.regRepository.find({
            where: {
                user,
                school_subject_code: code,
                type_school_subject: "Questões",
            },
            select: [
                'start_date',
                'qtd_questions',
                'questions_hits'
            ],
            order: {
                start_date: 'ASC'
            }
        });

        // Agrupando os registros por ano
        const registrosPorAno: { [year: string]: any } = {};
        for (const registro of registros) {
            const year = registro.start_date.toString().substring(0, 4);
            if (!registrosPorAno[year]) {
                registrosPorAno[year] = [];
            }
            registrosPorAno[year].push(registro);
        }

        // Calculando as estatísticas para cada ano
        const data = [];
        for (const year in registrosPorAno) {
            const registrosAno = registrosPorAno[year];
            let sumQtdQuestions = 0;
            let sumQuestionsHits = 0;

            for (const registro of registrosAno) {
                sumQtdQuestions += parseInt(registro.qtd_questions);
                sumQuestionsHits += parseInt(registro.questions_hits);
            }

            const percentage = ((sumQuestionsHits / sumQtdQuestions) * 100).toFixed(2);

            data.push({
                year,
                qtd_questions: sumQtdQuestions.toString(),
                questions_hits: sumQuestionsHits.toString(),
                percentage
            });
        }

        // Calculando a porcentagem total
        let sumQtdQuestionsTotal = 0;
        let sumQuestionsHitsTotal = 0;
        for (const registro of registros) {
            sumQtdQuestionsTotal += parseInt(registro.qtd_questions);
            sumQuestionsHitsTotal += parseInt(registro.questions_hits);
        }
        const percentageTotal = ((sumQuestionsHitsTotal / sumQtdQuestionsTotal) * 100).toFixed(2);

        const result = {
            data,
            percentage_total: percentageTotal,
            sumQtdQuestions: sumQtdQuestionsTotal,
            sumQuestionsHits: sumQuestionsHitsTotal
        };

        return result;
    }

    async yearQuestionsByCode(user: string, code: string): Promise<any> {
        const registros: any = await this.regRepository.find({
            where: {
                user,
                school_subject_code: code,
                type_school_subject: "Questões",
            },
            select: [
                'start_date',
                'qtd_questions',
                'questions_hits'
            ],
            order: {
                start_date: 'ASC'
            }
        });

        // Agrupando os registros por ano e mês
        const registrosPorAnoMes: { [year: number]: { [month: string]: any[] } } = {};
        for (const registro of registros) {
            const [year, month] = registro.start_date.toString().substring(0, 7).split('-').map(Number);
            if (!registrosPorAnoMes[year]) {
                registrosPorAnoMes[year] = {};
            }
            const key = `${year}-${month}`;
            if (!registrosPorAnoMes[year][key]) {
                registrosPorAnoMes[year][key] = [];
            }
            registrosPorAnoMes[year][key].push(registro);
        }

        // Organizando os dados no formato desejado
        const data = [];
        for (const year in registrosPorAnoMes) {
            const meses = [];
            for (const month in registrosPorAnoMes[year]) {
                const registrosMes = registrosPorAnoMes[year][month];
                let sumQtdQuestions = 0;
                let sumQuestionsHits = 0;

                for (const registro of registrosMes) {
                    sumQtdQuestions += parseInt(registro.qtd_questions);
                    sumQuestionsHits += parseInt(registro.questions_hits);
                }

                const percentage = ((sumQuestionsHits / sumQtdQuestions) * 100).toFixed(2);

                meses.push({
                    month,
                    qtd_questions: sumQtdQuestions.toString(),
                    questions_hits: sumQuestionsHits.toString(),
                    percentage
                });
            }
            data.push({
                year: parseInt(year),
                months: meses
            });
        }

        // Calculando a porcentagem total
        let sumQtdQuestionsTotal = 0;
        let sumQuestionsHitsTotal = 0;
        for (const registro of registros) {
            sumQtdQuestionsTotal += parseInt(registro.qtd_questions);
            sumQuestionsHitsTotal += parseInt(registro.questions_hits);
        }
        const percentageTotal = ((sumQuestionsHitsTotal / sumQtdQuestionsTotal) * 100).toFixed(2);

        const result = {
            data,
            percentage_total: percentageTotal,
            sumQtdQuestions: sumQtdQuestionsTotal,
            sumQuestionsHits: sumQuestionsHitsTotal
        };

        return result;
    }

    // async monthQuestionsByCode(user: string, code: string): Promise<any> {
    // }

    // async weekQuestionsByCode(user: string, code: string): Promise<any> {
    // }

    async dayQuestionsByCode(user: string, code: string): Promise<any[]> {
        const registros = await this.regRepository.find({
            where: {
                user,
                school_subject_code: code,
                type_school_subject: "Questões",
            },
            select: [
                'start_date',
                'qtd_questions',
                'questions_hits'
            ],
            order: {
                start_date: 'ASC'
            }
        });

        // Agrupando os registros pelo mesmo start_date e somando qtd_questions e questions_hits
        const registrosAgrupados: { [key: string]: { start_date: string, qtd_questions: number, questions_hits: number } } = {};

        registros.forEach(registro => {
            const key = registro.start_date.toString();
            if (!registrosAgrupados[key]) {
                registrosAgrupados[key] = {
                    start_date: registro.start_date.toString(),
                    qtd_questions: parseInt(registro.qtd_questions),
                    questions_hits: parseInt(registro.questions_hits)
                };
            } else {
                registrosAgrupados[key].qtd_questions += parseInt(registro.qtd_questions);
                registrosAgrupados[key].questions_hits += parseInt(registro.questions_hits);
            }
        });

        // Calculando a porcentagem para cada registro agrupado
        const registrosComPorcentagem = Object.values(registrosAgrupados).map(registro => {
            const percentage = ((registro.questions_hits / registro.qtd_questions) * 100).toFixed(2);
            return {
                ...registro,
                percentage
            };
        });

        return registrosComPorcentagem;
    }

    getWeeksOfMonth(yearAndMonth: string): any {
        const [year, month] = yearAndMonth.split('-').map(Number);
        const startDate = startOfMonth(new Date(year, month - 1)); // Note que month - 1 porque os meses são baseados em zero no JavaScript
        const endDate = endOfMonth(new Date(year, month - 1));
        return eachWeekOfInterval({ start: startDate, end: endDate });
    }

}