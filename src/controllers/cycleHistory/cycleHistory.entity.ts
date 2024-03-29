/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class CycleHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  name: string;

  @Column()
  user: string;

  @Column('jsonb', { default: [] })
  materias: object[];

  @Column({ type: 'date', default: () => 'now()' })
  replacement: Date;

  constructor(
    user: string,
    name: string,
    replacement: Date,
  ) {
    this.id = uuidv4();
    this.name = name;
    this.user = user;
    this.replacement = replacement;
    this.materias = [];
  }
}
