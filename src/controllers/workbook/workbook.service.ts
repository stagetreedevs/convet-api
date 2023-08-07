/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workbook } from './workbook.entity';
import { Register } from '../register/register.entity';

@Injectable()
export class WorkbookService {
  constructor(
    @InjectRepository(Workbook)
    private readonly wbRepository: Repository<Workbook>,
    @InjectRepository(Register)
    private readonly regRepository: Repository<Register>,
  ) { }

  async create(apostila: Workbook): Promise<Workbook> {
    const verify = await this.findMateria(apostila.code)
    if (verify) {
      throw new Error('Já existe apostila com esse code!');
    }
    return this.wbRepository.save(apostila);
  }

  async findAll(): Promise<Workbook[]> {
    return this.wbRepository.find();
  }

  async findOne(id: string): Promise<Workbook> {
    return this.wbRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async findMateria(name: string): Promise<Workbook> {
    return this.wbRepository.findOne({
      where: {
        code: name,
      }
    });
  }

  async findName(name: string): Promise<Workbook> {
    return this.wbRepository.findOne({
      where: {
        name: name,
      }
    });
  }

  async update(id: string, apostila: Workbook): Promise<Workbook> {
    const verify = await this.findMateria(apostila.code)
    if (verify) {
      throw new Error('Já existe apostila com esse code!');
    }
    
    const currentWb = await this.findOne(id);

    //Atualiza registro
    const registros: any[] = await this.regRepository.find({
      where: {
        workbook: currentWb?.name,
      }
    });

    for (const registro of registros) {
      registro.workbook = apostila.name;
      registro.last_page = apostila.pages;
      await this.regRepository.update(registro.id, registro);
    }

    //Atualiza apostila
    await this.wbRepository.update(id, apostila);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.wbRepository.delete(id);
  }
}
