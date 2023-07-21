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

    const order = this.separateByCode(cycle.materias);
    cycle.materias = order;
    
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
    const order = this.separateByCode(disciplinas);
    await this.cycleModelService.update(id, { materias: order });
    return this.cycleModelService.findOne({
      where: {
        id: id,
      }
    });
  }

  async remove(id: string): Promise<void> {
    await this.cycleModelService.delete(id);
  }

  separateByCode(objArray: any[]): any[] {
    const separatedArray: any[] = [];
    const codeMap: { [code: string]: any[] } = {};
    for (const obj of objArray) {
      const code = obj.code;
      if (!codeMap[code]) {
        codeMap[code] = [];
      }
      codeMap[code].push(obj);
    }

    while (true) {
      let added = false;
      for (const code in codeMap) {
        if (codeMap[code].length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          separatedArray.push(codeMap[code].shift()!);
          added = true;
        }
      }
      if (!added) break;
    }
    return separatedArray;
  }

}
