/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterTimesService } from '../times/register-times.service';
import { Register } from '../register.entity';

@Injectable()
export class RegisterAllTimesService {
    constructor(
        @InjectRepository(Register) private readonly regRepository: Repository<Register>,
        private readonly timesService: RegisterTimesService
    ) { }

    async totalTime(user: string) {
        const registros = await this.regRepository.find({
            where: {
                user,
            },
            select: [
                'school_subject_name',
                'school_subject_code'
            ],
            order: {
                start_date: 'ASC'
            }
        });

        const materiasUsuarioMap = {};

        registros.forEach(registro => {
            const { school_subject_name, school_subject_code } = registro;
            if (!materiasUsuarioMap[school_subject_code]) {
                materiasUsuarioMap[school_subject_code] = {
                    school_subject_name,
                    school_subject_code
                };
            }
        });

        const disciplinas: any = Object.values(materiasUsuarioMap);

        const resolve = [];

        for (const materia of disciplinas) {
            const objeto = {
                materia: materia.school_subject_name,
                code: materia.school_subject_code,
                years: await this.timesService.totalTimeByCode(user, materia.school_subject_code),
                total: await this.timesService.totalTime(user, materia.school_subject_code),
            }
            resolve.push(objeto);
        }

        return resolve;
    }

    async yearTime(user: string) {
        const registros = await this.regRepository.find({
            where: {
                user,
            },
            select: [
                'school_subject_name',
                'school_subject_code'
            ],
            order: {
                start_date: 'ASC'
            }
        });

        const materiasUsuarioMap = {};

        registros.forEach(registro => {
            const { school_subject_name, school_subject_code } = registro;
            if (!materiasUsuarioMap[school_subject_code]) {
                materiasUsuarioMap[school_subject_code] = {
                    school_subject_name,
                    school_subject_code
                };
            }
        });

        const disciplinas: any = Object.values(materiasUsuarioMap);

        const resolve = [];

        for (const materia of disciplinas) {
            const objeto = {
                materia: materia.school_subject_name,
                code: materia.school_subject_code,
                data: await this.timesService.yearTimeByCode(user, materia.school_subject_code)
            }
            resolve.push(objeto);
        }

        return resolve;
    }

    async monthTime(user: string) {
        const registros = await this.regRepository.find({
            where: {
                user,
            },
            select: [
                'school_subject_name',
                'school_subject_code'
            ],
            order: {
                start_date: 'ASC'
            }
        });

        const materiasUsuarioMap = {};

        registros.forEach(registro => {
            const { school_subject_name, school_subject_code } = registro;
            if (!materiasUsuarioMap[school_subject_code]) {
                materiasUsuarioMap[school_subject_code] = {
                    school_subject_name,
                    school_subject_code
                };
            }
        });

        const disciplinas: any = Object.values(materiasUsuarioMap);

        const resolve = [];

        for (const materia of disciplinas) {
            const objeto = {
                materia: materia.school_subject_name,
                code: materia.school_subject_code,
                data: await this.timesService.monthTimeByCode(user, materia.school_subject_code)
            }
            resolve.push(objeto);
        }

        return resolve;
    }

    async weekTime(user: string) {
        const registros = await this.regRepository.find({
            where: {
                user,
            },
            select: [
                'school_subject_name',
                'school_subject_code'
            ],
            order: {
                start_date: 'ASC'
            }
        });

        const materiasUsuarioMap = {};

        registros.forEach(registro => {
            const { school_subject_name, school_subject_code } = registro;
            if (!materiasUsuarioMap[school_subject_code]) {
                materiasUsuarioMap[school_subject_code] = {
                    school_subject_name,
                    school_subject_code
                };
            }
        });

        const disciplinas: any = Object.values(materiasUsuarioMap);

        const resolve = [];

        for (const materia of disciplinas) {
            const objeto = {
                materia: materia.school_subject_name,
                code: materia.school_subject_code,
                data: await this.timesService.weekTimeByCode(user, materia.school_subject_code)
            }
            resolve.push(objeto);
        }

        return resolve;
    }

    async dayTime(user: string) {
        const registros = await this.regRepository.find({
            where: {
                user,
            },
            select: [
                'school_subject_name',
                'school_subject_code'
            ],
            order: {
                start_date: 'ASC'
            }
        });

        const materiasUsuarioMap = {};

        registros.forEach(registro => {
            const { school_subject_name, school_subject_code } = registro;
            if (!materiasUsuarioMap[school_subject_code]) {
                materiasUsuarioMap[school_subject_code] = {
                    school_subject_name,
                    school_subject_code
                };
            }
        });

        const disciplinas: any = Object.values(materiasUsuarioMap);

        const resolve = [];

        for (const materia of disciplinas) {
            const objeto = {
                materia: materia.school_subject_name,
                code: materia.school_subject_code,
                data: await this.timesService.dayTimeByCode(user, materia.school_subject_code)
            }
            resolve.push(objeto);
        }

        return resolve;
    }
}