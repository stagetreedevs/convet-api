/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cycle } from './cycle.entity';
import { CycleHistoryService } from '../cycleHistory/cycleHistory.service';
@Injectable()
export class CycleService {
  constructor(
    @InjectRepository(Cycle)
    private readonly cycleService: Repository<Cycle>,
    private histService: CycleHistoryService
  ) { }

  async create(cycle: any): Promise<Cycle> {
    return this.cycleService.save(cycle);
  }

  async findAll(): Promise<Cycle[]> {
    return this.cycleService.find();
  }

  async findUser(user_id: string): Promise<Cycle[]> {
    return this.cycleService.find({
      where: {
        user: user_id,
      },
    });
  }

  async findOneCycle(user_id: string): Promise<Cycle[]> {
    const cycles = await this.cycleService.find({
      where: {
        user: user_id,
      },
    });

    // Função para agrupar as matérias pelo nome e somar as horas
    const groupAndSumSubjects = (subjects) => {
      const subjectMap = new Map();

      subjects.forEach((subject) => {
        const { id, code, name, horas } = subject;

        // Converter horas para número, se for uma string
        const horasNumber = typeof horas === 'string' ? parseFloat(horas) : horas;

        if (!subjectMap.has(name)) {
          subjectMap.set(name, { id, code, name, horas: horasNumber });
        } else {
          const existingSubject = subjectMap.get(name);
          existingSubject.horas += horasNumber;
        }
      });

      return Array.from(subjectMap.values());
    };

    // Aplicar a função de agrupamento e soma para cada ciclo
    const resultCycles = cycles.map((cycle) => ({
      ...cycle,
      materias: groupAndSumSubjects(cycle.materias),
    }));

    return resultCycles;
  }


  async userArray(user_id: string): Promise<any[]> {
    const cycles = await this.cycleService.find({
      where: {
        user: user_id,
      },
    });

    return cycles.flatMap((cycle) => cycle.materias);
  }

  async findOne(id: string): Promise<Cycle> {
    return this.cycleService.findOne({
      where: {
        id: id,
      }
    });
  }

  async findMaterias(user_id: string): Promise<any> {
    return this.cycleService.findOne({
      where: {
        user: user_id,
      },
    });
  }

  async updateName(id: string, body: any): Promise<Cycle> {
    if (!body.name) {
      throw new BadRequestException('O campo "name" é obrigatório para a atualização.');
    }

    await this.cycleService.update(id, { name: body.name });

    return await this.findOne(id);
  }

  async update(id: string, cycle: Cycle): Promise<Cycle> {
    await this.cycleService.update(id, cycle);
    return this.cycleService.findOne({
      where: {
        id: id,
      }
    });
  }

  async updateMaterias2(id: string, disciplinas: any): Promise<Cycle> {
    const order = await this.separateAndDivideHours(disciplinas);
    disciplinas = await this.separateByName(order);

    const ciclo = await this.findOne(id);

    if (ciclo.materias.length > 0) {
      const history = {
        name: ciclo.name,
        user: ciclo.user,
        materias: ciclo.materias
      }

      await this.histService.create(history);
    }

    await this.cycleService.update(id, { materias: disciplinas });
    return await this.findOne(id);
  }

  async updateMaterias(id: string, body: any): Promise<Cycle> {
    let disciplinas = body.disciplinas;
    const name = body.name;

    //QUEBRA AS HORAS DAS MATÉRIAS DO CICLO
    const order = this.separateAndDivideHours(disciplinas);
    //FUNÇÃO QUE EMBARALHA
    disciplinas = this.separateByName(order);
    // const order = await this.separateByName(disciplinas);

    const ciclo = await this.findOne(id);

    if (ciclo.materias.length > 0) {
      const history = {
        name: ciclo.name,
        user: ciclo.user,
        materias: ciclo.materias
      }

      await this.histService.create(history);
    }

    await this.cycleService.update(id, { name, materias: disciplinas });
    return this.cycleService.findOne({
      where: {
        id: id,
      }
    });
  }

  // AUXILIARES EMBARALHAMENTO
  generateRandomKey(): string {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return (
      s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    );
  }

  separateAndDivideHours(objArray: any[]): any[] {
    const separatedAndDividedArray: any[] = [];
    const codeMap: { [code: string]: any[] } = {};

    for (const obj of objArray) {
      const code = obj.code;
      const numericPart = code.match(/\d+$/); // Extrai o numeral final do código
      const key = numericPart ? `${code.replace(numericPart[0], '')}-${numericPart[0]}` : code;

      if (!codeMap[key]) {
        codeMap[key] = [];
      }

      let remainingHours = parseFloat(obj.horas || 0); // Converte horas para número

      while (remainingHours > 0) {
        let newHours;
        if (remainingHours >= 1) {
          newHours = remainingHours % 1 === 0.5 ? 0.5 : 1;
        } else {
          newHours = remainingHours;
        }
        codeMap[key].push({ ...obj, id: this.generateRandomKey(), horas: newHours });
        remainingHours -= newHours;
      }
    }

    for (const key in codeMap) {
      separatedAndDividedArray.push(...codeMap[key]);
    }

    return separatedAndDividedArray;
  }

  separateByName(objArray: any[]): any[] {
    const separatedArray: any[] = [];
    const nameMap: { [name: string]: any[] } = {};

    for (const obj of objArray) {
      const name = obj.name;
      if (!nameMap[name]) {
        nameMap[name] = [];
      }
      nameMap[name].push(obj);
    }

    while (true) {
      let added = false;
      for (const name in nameMap) {
        if (nameMap[name].length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          separatedArray.push(nameMap[name].shift()!);
          added = true;
        }
      }
      if (!added) break;
    }

    return separatedArray;
  }
  // AUXILIARES EMBARALHAMENTO

  async remove(id: string): Promise<void> {
    await this.cycleService.delete(id);
  }

  async deleteByUser(userId: string): Promise<void> {
    const cycle = await this.cycleService.findOne({ where: { user: userId } });

    if (cycle) {
      await this.cycleService.remove(cycle);
    }
  }
}
