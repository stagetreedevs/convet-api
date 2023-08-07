/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Workbook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  materia: string;

  @Column()
  pages: number;

  constructor(name: string, code: string, materia: string, pages: number) {
    this.name = name;
    this.code = code;
    this.materia = materia;
    this.pages = pages;
    this.id = uuidv4();
  }
}