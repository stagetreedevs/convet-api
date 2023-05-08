/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SchoolSubjectService } from './school_subject.service';
import { SchoolSubject } from './school_subject.entity';

@Controller('materia')
export class SchoolSubjectController {
  constructor(private readonly matService: SchoolSubjectService) {}

  @Post()
  async create(@Body() materia: SchoolSubject): Promise<SchoolSubject> {
    return this.matService.create(materia);
  }

  @Get()
  async findAll(): Promise<SchoolSubject[]> {
    return this.matService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SchoolSubject> {
    return this.matService.findOne(id);
  }

  @Get('name/:name')
  async findName(@Param('name') name: string): Promise<SchoolSubject> {
    return this.matService.findName(name);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() materia: SchoolSubject): Promise<SchoolSubject> {
    return this.matService.update(id, materia);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.matService.remove(id);
  }
}
