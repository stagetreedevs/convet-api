/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Observation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  planning: string;

  @Column({ default: null })
  teacher: string;

  @Column({ default: null })
  title: string;

  @Column({ default: null })
  message: string;

  constructor(
    planning: string,
    teacher: string,
    title: string,
    message: string
  ) {
    this.planning = planning;
    this.teacher = teacher;
    this.title = title;
    this.message = message;
    this.id = uuidv4();
  }
}
