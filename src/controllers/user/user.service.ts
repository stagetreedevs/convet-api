/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
        where: {
            id: id,
        }
    });
  }

  async findEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
        where: {
            email: email,
        }
    });
  }

  async update(id: string, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({
        where: {
            id: id,
        }
    });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
