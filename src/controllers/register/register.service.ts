/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Register } from './register.entity';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private readonly regRepository: Repository<Register>,
  ) { }

  async create(register: Register): Promise<Register> {
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
