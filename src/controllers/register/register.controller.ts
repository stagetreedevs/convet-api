/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Register } from './register.entity';
import { RegisterService } from './register.service';
@Controller('registro')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async create(@Body() register: Register): Promise<Register> {
    return this.registerService.create(register);
  }

  @Get()
  async findAll(): Promise<Register[]> {
    return this.registerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Register> {
    return this.registerService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() register: Register): Promise<Register> {
    return this.registerService.update(id, register);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.registerService.remove(id);
  }
}
