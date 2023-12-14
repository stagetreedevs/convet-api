/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CycleModel } from './cycleModel.entity';
@Injectable()
export class CycleModelService {
  constructor(
    @InjectRepository(CycleModel)
    private readonly cycleModelService: Repository<CycleModel>,
  ) { }

  async create(cycle: any): Promise<CycleModel> {
    const existingCycle = await this.cycleModelService.findOne({ where: { name: cycle.name } });

    if (existingCycle) {
      throw new Error('O ciclo com esse nome já existe.');
    }

    //QUEBRA AS HORAS DAS MATÉRIAS DO CICLO
    const order = this.separateAndDivideHours(cycle.materias);
    //FUNÇÃO QUE EMBARALHA
    cycle.materias = this.separateByName(order);
    return this.cycleModelService.save(cycle);
  }

  async findAll(): Promise<CycleModel[]> {
    return this.cycleModelService.find();
  }

  async findOne(id: string): Promise<CycleModel> {
    return this.cycleModelService.findOne({
      where: {
        id: id,
      }
    });
  }

  async update(id: string, cycle: CycleModel): Promise<CycleModel> {
    await this.cycleModelService.update(id, cycle);
    return this.cycleModelService.findOne({
      where: {
        id: id,
      }
    });
  }

  async updateMaterias(id: string, disciplinas: any): Promise<CycleModel> {
    let order = this.separateAndDivideHours(disciplinas);
    order = this.separateByName(order);

    await this.cycleModelService.update(id, { materias: order });
    return this.findOne(id);
  }


  async remove(id: string): Promise<void> {
    await this.cycleModelService.delete(id);
  }

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
        const newHours = Math.random() >= 0.5 ? 1 : 0.5;
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

}
