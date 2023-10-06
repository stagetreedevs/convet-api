/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Observation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  cycle: string;

  @Column({ default: null })
  user: string;

  @Column({ default: null })
  title: string;

  @Column({ default: null })
  message: string;

  constructor(
    cycle: string,
    user: string,
    title: string,
    message: string
  ) {
    this.cycle = cycle;
    this.user = user;
    this.title = title;
    this.message = message;
    this.id = uuidv4();
  }
}
