/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class CycleModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('jsonb', { default: [] })
  materias: object[];

  constructor(
    name: string
  ) {
    this.id = uuidv4();
    this.name = name;
    this.materias = [];
  }
}
