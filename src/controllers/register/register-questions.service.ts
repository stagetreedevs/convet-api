/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Register } from './register.entity';
import { eachWeekOfInterval, endOfWeek, startOfWeek } from 'date-fns';
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

    async monthQuestionsByCode(user: string, code: string): Promise<any> {
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

        if (registros.length == 0) {
            return [];
        }

        const first_date = registros[0].start_date;
        const last_date = registros[(registros.length - 1)].start_date;

        const weeks = this.getWeeksInRange(first_date, last_date);

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

        const registerSumByDay = await this.calculateSumPerWeek(groupedRegisters);

        for (const semana in registerSumByDay) {
            const registro = registerSumByDay[semana];
            if (registro.total_qtd_questions !== 0) {
                const percentage = ((registro.total_questions_hits / registro.total_qtd_questions) * 100).toFixed(2);
                registro.percentage = parseFloat(percentage);
            } else {
                registro.percentage = 0;
            }
        }

        const organization_response = this.organizeByYearMonth(registerSumByDay);

        const meses = this.calculateSumByMonth(organization_response);

        for (const mes of meses) {
            if (mes.sumQtdQuestions !== 0) {
                const percentage = ((mes.sumQuestionsHits / mes.sumQtdQuestions) * 100).toFixed(2);
                mes.percentage = parseFloat(percentage);
            } else {
                mes.percentage = 0;
            }
        }

        return meses;

    }

    async weekQuestionsByCode(user: string, code: string): Promise<any> {
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

        if (registros.length == 0) {
            return [];
        }

        const first_date = registros[0].start_date;
        const last_date = registros[(registros.length - 1)].start_date;

        const weeks = this.getWeeksInRange(first_date, last_date);

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

        const registerSumByDays = await this.sumWeeksByStartDate(groupedRegisters);

        const questions_calculate = this.calculatePercentagePerWeek(registerSumByDays);

        const semanas = this.calculateSumByWeeks(questions_calculate);

        for (const semana of semanas) {
            if (semana.sumQtdQuestions !== 0) {
                const percentage = ((semana.sumQuestionsHits / semana.sumQtdQuestions) * 100).toFixed(2);
                semana.percentage = parseFloat(percentage);
            } else {
                semana.percentage = 0;
            }
        }

        return this.transformWeekRegisters(semanas);
    }

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

    getWeeksInRange(firstDate, lastDate) {
        const startDate = startOfWeek(new Date(firstDate), { weekStartsOn: 0 }); // Domingo
        const endDate = endOfWeek(new Date(lastDate), { weekStartsOn: 0 }); // Sábado
        const weeks = eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 0 });

        return weeks.map(weekStartDate => {
            const weekEndDate = new Date(weekStartDate);
            weekEndDate.setDate(weekEndDate.getDate() + 6);
            return `${weekStartDate.toISOString().substring(0, 10)} - ${weekEndDate.toISOString().substring(0, 10)}`;
        });
    }

    calculateSumPerWeek(registros: any[]) {
        const somaPorSemana = {};

        registros.forEach(registro => {
            const semana = registro.week;

            // Verifica se a semana já está presente no objeto de somaPorSemana
            if (!somaPorSemana[semana]) {
                somaPorSemana[semana] = { total_qtd_questions: 0, total_questions_hits: 0 };
            }

            // Percorre os registros dentro da semana e adiciona as quantidades
            registro.registers.forEach(registroSemana => {
                somaPorSemana[semana].total_qtd_questions += parseInt(registroSemana.qtd_questions);
                somaPorSemana[semana].total_questions_hits += parseInt(registroSemana.questions_hits);
            });
        });

        return somaPorSemana;
    }

    organizeByYearMonth(registros: any) {
        const registrosOrganizados = {};

        for (const semana in registros) {
            const registro = registros[semana];
            const anoMes = semana.split(' - ')[0].substring(0, 7);

            if (!registrosOrganizados[anoMes]) {
                registrosOrganizados[anoMes] = [];
            }

            registrosOrganizados[anoMes].push({ week: semana, ...registro });
        }

        const resultadoFinal = [];
        for (const mes in registrosOrganizados) {
            resultadoFinal.push({ month: mes, weeks: registrosOrganizados[mes] });
        }

        return resultadoFinal;
    }

    calculateSumByMonth(months: any[]): any[] {
        const result: any[] = [];

        for (const month of months) {
            const sumQtdQuestions = month.weeks.reduce((acc: number, week: any) => acc + week.total_qtd_questions, 0);
            const sumQuestionsHits = month.weeks.reduce((acc: number, week: any) => acc + week.total_questions_hits, 0);

            const updatedWeeks = month.weeks.map((week: any) => {
                return {
                    ...week,
                    total_qtd_questions: week.total_qtd_questions,
                    total_questions_hits: week.total_questions_hits,
                };
            });

            result.push({
                month: month.month,
                sumQtdQuestions,
                sumQuestionsHits,
                weeks: updatedWeeks,
            });
        }

        return result;
    }

    calculateSumByWeeks(weeks: any[]): any[] {
        const result: any[] = [];

        for (const item of weeks) {
            const sumQtdQuestions = Object.values(item.registers).reduce((acc: number, register: any) => acc + register.qtd_questions, 0);
            const sumQuestionsHits = Object.values(item.registers).reduce((acc: number, register: any) => acc + register.questions_hits, 0);

            result.push({
                ...item,
                sumQtdQuestions,
                sumQuestionsHits,
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
                    acc[registro.start_date] = { qtd_questions: 0, questions_hits: 0 };
                }
                acc[registro.start_date].qtd_questions += parseInt(registro.qtd_questions, 10);
                acc[registro.start_date].questions_hits += parseInt(registro.questions_hits, 10);
                return acc;
            }, {});

            somaPorSemana.push({
                week: semana.week,
                registers: soma
            });
        });

        return somaPorSemana;
    }

    transformWeekRegisters(data: any[]): any[] {
        return data.map(item => ({
            ...item,
            registers: Object.keys(item.registers).map(day => ({
                day,
                ...item.registers[day]
            }))
        }));
    }

    calculatePercentagePerWeek(registersArray) {
        for (let i = 0; i < registersArray.length; i++) {
            const weekRegisters = registersArray[i].registers;
            if (Object.keys(weekRegisters).length > 0) {
                for (const date in weekRegisters) {
                    const register = weekRegisters[date];
                    if (register.hasOwnProperty('qtd_questions') && register.hasOwnProperty('questions_hits')) {
                        const qtd_questions = register.qtd_questions;
                        const questions_hits = register.questions_hits;
                        const percentage = ((questions_hits / qtd_questions) * 100).toFixed(2);
                        register.percentage = parseFloat(percentage);
                    }
                }
            }
        }
        return registersArray;
    }

}