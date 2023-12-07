/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Cycle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  user: string;

  @Column('jsonb', { default: [] })
  materias: object[];

  constructor(
    name: string,
    user: string,
  ) {
    this.id = uuidv4();
    this.name = name;
    this.user = user;
    this.materias = [];
  }
}
