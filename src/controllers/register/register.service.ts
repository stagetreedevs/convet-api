/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns';
import { Register } from './register.entity';
interface PartialRegister {
  type_school_subject: string;
  duration: string;
}
@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private readonly regRepository: Repository<Register>,
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

    return this.regRepository.save(register);
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

  // CALCULA PARA TODOS OS REGISTROS
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

  // CALCULA OS REGISTROS APENAS DE 2023
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

  // CALCULA OS REGISTROS APENAS NO MÊS ATUAL
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

  // CALCULA OS REGISTROS APENAS NA SEMANA ATUAL
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

  // CALCULA OS REGISTROS APENAS NO DIA ATUAL
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
    return this.regRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async remove(id: string): Promise<void> {
    await this.regRepository.delete(id);
  }
}
