/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns';
import { Register } from './register.entity';
import { Cycle } from '../cycle/cycle.entity';
interface PartialRegister {
  type_school_subject: string;
  duration: string;
}
@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private readonly regRepository: Repository<Register>,
    @InjectRepository(Cycle)
    private readonly cycleService: Repository<Cycle>,
  ) { }

  async create(register: Register): Promise<Register> {
    const startSeconds = this.convertDurationToSeconds(register.start_time);
    const endSeconds = this.convertDurationToSeconds(register.end_time);
    const durationSeconds = endSeconds - startSeconds;
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;
    const duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    register.duration = duration;

    const lastPage = parseInt(register.last_page);
    const pagesRead = parseInt(register.pages_read);
    const percentageRead = (pagesRead / lastPage) * 100;
    const roundedPercentage = percentageRead.toFixed(2);
    register.progress = roundedPercentage.toString(); // Converter para string e atribuir a register.progress

    register.revision_number = 1; // Inicializa o número de revisão

    return this.regRepository.save(register);
  }

  async createQuestion(body: any): Promise<Register> {
    const question = {
      user: body.user,
      cycle: body.cycle,
      school_subject_name: body.school_subject_name,
      school_subject_code: body.school_subject_code,
      qtd_questions: body.qtd_questions,
      questions_hits: body.questions_hits,
      notes: body.notes,
      //outros
      type: '',
      type_school_subject: '',
      progress: '0',
      pages_read: '0',
      last_page_read: '0',
      last_page: '0',
      revision_number: 1,
      videos_watched: '0'
    };

    return this.regRepository.save(question);
  }

  async findAll(): Promise<Register[]> {
    return this.regRepository.find();
  }

  async findUser(user_id: string): Promise<Register[]> {
    return this.regRepository.find({
      where: {
        user: user_id,
      },
    });
  }

  async findMateria(user_id: string, materia: string): Promise<any> {
    return this.regRepository.findOne({
      where: {
        user: user_id,
        school_subject_name: materia,
      },
    });
  }

  // FUNÇÃO AUXILIAR PARA RETORNAR HORAS DE UMA MATÉRIA CICLO VIA CÓDIGO
  async userArray(user_id: string, codeToFilter: string): Promise<any | null> {
    const cycles = await this.cycleService.find({
      where: {
        user: user_id,
      },
    });

    // Encontre os ciclos que contêm o código especificado
    const filteredCycles = cycles.filter((cycle) =>
      cycle.materias.some((materia: any) => materia.code === codeToFilter)
    );

    // Use um objeto para armazenar as informações agrupadas por código
    const groupedByCode = {};

    // Itere sobre os ciclos filtrados e agrupe as informações por código
    filteredCycles.forEach((cycle: any) => {
      cycle.materias.forEach((materia) => {
        const code = materia.code;

        if (groupedByCode[code]) {
          // Se já existe um objeto com esse código, adicione as horas
          groupedByCode[code].horas += parseInt(materia.horas, 10);
        } else {
          // Se não existe um objeto com esse código, crie um novo
          groupedByCode[code] = {
            code: code,
            name: materia.name,
            horas: parseInt(materia.horas, 10),
          };
        }
      });
    });

    // Retorne o objeto com o código especificado, se encontrado
    const result = groupedByCode[codeToFilter] || null;

    return result;
  }

  // FUNÇÃO AUXILIAR PARA COMPARAR HORAS(NUMBER) COM DURATION(STRING)
  compareHoursAndDuration(hours, duration) {
    const durationParts = duration.split(':');

    const durationHours = parseInt(durationParts[0], 10);
    const durationMinutes = parseInt(durationParts[1], 10);
    const durationSeconds = parseInt(durationParts[2], 10);

    const totalDurationHours =
      durationHours + durationMinutes / 60 + durationSeconds / 3600;

    return hours > totalDurationHours;
  }

  async findByCode(user_id: string, code: string): Promise<any> {
    const quantityHours = await this.userArray(user_id, code);

    const registros = await this.regRepository.find({
      where: {
        user: user_id,
        school_subject_code: code,
      },
    });

    const soma = {
      pages_read: 0,
      last_page: 0,
      progress: "0",
      revision_number: 0,
      videos_watched: 0,
      qtd_questions: 0,
      questions_hits: 0,
      duration: "00:00:00",
      quantity_hours_cycle: quantityHours.horas,
      finished: false
    };

    for (const registro of registros) {
      soma.pages_read += parseFloat(registro.pages_read || '0');
      soma.videos_watched += parseFloat(registro.videos_watched || '0');
      soma.qtd_questions += parseFloat(registro.qtd_questions || '0');
      soma.questions_hits += parseFloat(registro.questions_hits || '0');

      // Soma dos durations
      const registroDuration = registro.duration;
      const [horas, minutos, segundos] = registroDuration.split(':').map(Number);

      // Converter a duração do registro em segundos e somar ao total
      const durationSeconds = horas * 3600 + minutos * 60 + segundos;
      const totalSeconds = this.convertDurationToSeconds(soma.duration) + durationSeconds;

      // Converter o resultado de volta para o formato "HH:mm:ss"
      const hours = Math.floor(totalSeconds / 3600);
      const remainingSeconds = totalSeconds % 3600;
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;

      soma.duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    let indexLastPage = null;

    for (let i = 0; i < registros.length; i++) {
      const registro = registros[i];
      if (registro.last_page !== "0") {
        indexLastPage = i;
        break; // Para quando encontrar o primeiro registro com last_page diferente de "0"
      }
    }

    if (indexLastPage) {
      const lastPage = parseInt(registros[indexLastPage].last_page);
      const pagesRead = soma.pages_read;
      const percentageRead = (pagesRead / lastPage) * 100;
      const roundedPercentage = percentageRead.toFixed(2);

      soma.last_page = parseInt(registros[indexLastPage].last_page); // PASSA O VALOR DA ÚLTIMA PÁGINA
      soma.progress = roundedPercentage.toString(); // ATRIBUI O VALOR DO PROGRESSO
    }

    soma.revision_number = registros.length;

    // COMPARA SE AS HORAS DO CICLO PASSARAM A DURAÇÃO DE ESTUDO
    if (!this.compareHoursAndDuration(quantityHours.horas, soma.duration)) {
      soma.finished = true;
    }
    return soma;
  }

  async totalTime(user_id: string, materia: string): Promise<string> {
    const questions: any[] = await this.regRepository.find({
      where: {
        user: user_id,
        school_subject_name: materia
      },
    });

    const allZeroQuestions = questions.every(question => question.qtd_questions === '0');

    if (allZeroQuestions) {
      return '00:00:00';
    }

    const verify = await this.regRepository.createQueryBuilder("register")
      .select("SUM(EXTRACT(EPOCH FROM register.duration))", "total_duration")
      .where("register.user = :user_id", { user_id })
      .andWhere("register.school_subject_name = :materia", { materia })
      .getRawOne();

    const totalDurationSeconds = verify.total_duration;
    const totalDurationHours = Math.floor(totalDurationSeconds / 3600);
    const totalDurationMinutes = Math.floor((totalDurationSeconds % 3600) / 60);
    const totalDurationSecondsRemainder = Math.floor(totalDurationSeconds % 60);

    const totalTimeFormatted = `${totalDurationHours.toString().padStart(2, '0')}:${totalDurationMinutes.toString().padStart(2, '0')}:${totalDurationSecondsRemainder.toString().padStart(2, '0')}`;

    return totalTimeFormatted;
  }

  async averageTime(user_id: string, materia: string): Promise<any[]> {
    const questions: any = await this.regRepository.find({
      where: {
        user: user_id,
        school_subject_name: materia
      },
    });

    const allZeroQuestions = questions.every(question => question.qtd_questions === '0');

    if (allZeroQuestions) {
      return [];
    }

    else {
      const result = await this.regRepository.createQueryBuilder("register")
        .select("TO_CHAR(DATE_TRUNC('month', register.start_date)::date, 'YYYY-MM')", "month")
        .addSelect("DATE_PART('year', register.start_date)::integer", "year")
        .addSelect("AVG(EXTRACT(EPOCH FROM register.duration))", "avg_duration")
        .where("register.user = :user_id", { user_id })
        .andWhere("register.school_subject_name = :materia", { materia })
        .groupBy("month, year")
        .orderBy("month", "ASC")
        .getRawMany();

      // Mapear o resultado para um array de objetos
      const groupedResults: any[] = [];
      result.forEach(item => {
        const month = item.month;
        const year = item.year;
        const avgDurationSeconds = parseFloat(item.avg_duration);
        const avgDurationMinutes = avgDurationSeconds / 60;
        const avgDurationFormatted = avgDurationMinutes.toFixed(2);
        const durationUnit = avgDurationMinutes >= 60 ? 'horas' : 'minutos';

        groupedResults.push({
          month: month,
          year: year,
          avgDuration: `${avgDurationFormatted} ${durationUnit}`
        });
      });

      return groupedResults;

    }
  }

  // BUSCA TODOS OS REGISTROS
  async allHours(user_id: string): Promise<PartialRegister[]> {
    const registers = await this.regRepository.find({
      where: {
        user: user_id,
      },
      select: ['type_school_subject', 'duration'],
    });

    const summedRegisters: { [key: string]: number } = {};

    for (const register of registers) {
      const { type_school_subject, duration } = register;

      const durationInSeconds = this.convertDurationToSeconds(duration);

      if (summedRegisters.hasOwnProperty(type_school_subject)) {
        summedRegisters[type_school_subject] += durationInSeconds;
      } else {
        summedRegisters[type_school_subject] = durationInSeconds;
      }
    }

    const result: PartialRegister[] = Object.keys(summedRegisters).map((key) => ({
      type_school_subject: key,
      duration: this.convertSecondsToDuration(summedRegisters[key]),
    }));

    return result;
  }

  // BUSCA OS REGISTROS DO ANO ATUAL
  async everYear(user_id: string): Promise<PartialRegister[]> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

    const registers = await this.regRepository.find({
      where: {
        user: user_id,
        start_date: Between(startOfYear, endOfYear),
      },
      select: ['type_school_subject', 'duration'],
    });

    const summedRegisters: { [key: string]: number } = {};

    for (const register of registers) {
      const { type_school_subject, duration } = register;

      const durationInSeconds = this.convertDurationToSeconds(duration);

      if (summedRegisters.hasOwnProperty(type_school_subject)) {
        summedRegisters[type_school_subject] += durationInSeconds;
      } else {
        summedRegisters[type_school_subject] = durationInSeconds;
      }
    }

    const result: PartialRegister[] = Object.keys(summedRegisters).map((key) => ({
      type_school_subject: key,
      duration: this.convertSecondsToDuration(summedRegisters[key]),
    }));

    return result;
  }

  // BUSCA OS REGISTROS NO MÊS ATUAL
  async currentMonth(user_id: string): Promise<PartialRegister[]> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Os meses são indexados a partir de 0, então adicionamos 1 para obter o mês atual
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59);

    const registers = await this.regRepository.find({
      where: {
        user: user_id,
        start_date: Between(startOfMonth, endOfMonth),
      },
      select: ['type_school_subject', 'duration'],
    });

    const summedRegisters: { [key: string]: number } = {};

    for (const register of registers) {
      const { type_school_subject, duration } = register;

      const durationInSeconds = this.convertDurationToSeconds(duration);

      if (summedRegisters.hasOwnProperty(type_school_subject)) {
        summedRegisters[type_school_subject] += durationInSeconds;
      } else {
        summedRegisters[type_school_subject] = durationInSeconds;
      }
    }

    const result: PartialRegister[] = Object.keys(summedRegisters).map((key) => ({
      type_school_subject: key,
      duration: this.convertSecondsToDuration(summedRegisters[key]),
    }));

    return result;
  }

  // BUSCA OS REGISTROS NA SEMANA ATUAL
  async currentWeek(user_id: string): Promise<PartialRegister[]> {
    const currentDate = new Date();
    const startOfWeekDate = startOfWeek(currentDate);
    const endOfWeekDate = endOfWeek(currentDate);

    const registers = await this.regRepository.find({
      where: {
        user: user_id,
        start_date: Between(startOfWeekDate, endOfWeekDate),
      },
      select: ['type_school_subject', 'duration'],
    });

    const summedRegisters: { [key: string]: number } = {};

    for (const register of registers) {
      const { type_school_subject, duration } = register;

      const durationInSeconds = this.convertDurationToSeconds(duration);

      if (summedRegisters.hasOwnProperty(type_school_subject)) {
        summedRegisters[type_school_subject] += durationInSeconds;
      } else {
        summedRegisters[type_school_subject] = durationInSeconds;
      }
    }

    const result: PartialRegister[] = Object.keys(summedRegisters).map((key) => ({
      type_school_subject: key,
      duration: this.convertSecondsToDuration(summedRegisters[key]),
    }));

    return result;
  }

  // BUSCA OS REGISTROS NO DIA ATUAL
  async currentDay(user_id: string): Promise<PartialRegister[]> {
    const currentDate = new Date();
    const startOfDayDate = startOfDay(currentDate);
    const endOfDayDate = endOfDay(currentDate);

    const registers = await this.regRepository.find({
      where: {
        user: user_id,
        start_date: Between(startOfDayDate, endOfDayDate),
      },
      select: ['type_school_subject', 'duration'],
    });

    const summedRegisters: { [key: string]: number } = {};

    for (const register of registers) {
      const { type_school_subject, duration } = register;

      const durationInSeconds = this.convertDurationToSeconds(duration);

      if (summedRegisters.hasOwnProperty(type_school_subject)) {
        summedRegisters[type_school_subject] += durationInSeconds;
      } else {
        summedRegisters[type_school_subject] = durationInSeconds;
      }
    }

    const result: PartialRegister[] = Object.keys(summedRegisters).map((key) => ({
      type_school_subject: key,
      duration: this.convertSecondsToDuration(summedRegisters[key]),
    }));

    return result;
  }

  //AUXILIARES PARA SOMA DE TEMPO
  private convertDurationToSeconds(duration: string | Date): number {
    if (typeof duration === 'string') {
      const [hours, minutes, seconds] = duration.split(':');
      return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    } else if (duration instanceof Date) {
      return duration.getHours() * 3600 + duration.getMinutes() * 60 + duration.getSeconds();
    }

    return 0;
  }

  private convertSecondsToDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const remainingMinutes = remainingSeconds % 60;
    const duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
    return duration;
  }

  async findOne(id: string): Promise<Register> {
    return this.regRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async update(id: string, register: Register): Promise<Register> {
    await this.regRepository.update(id, register);
    return this.regRepository.findOne({ where: { id: id } });
  }

  async remove(id: string): Promise<void> {
    await this.regRepository.delete(id);
  }
}
