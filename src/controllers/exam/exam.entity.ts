/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contest_code: string;

  @Column()
  exam_number: number;

  @Column('jsonb', { default: [] })
  subjects: object[];

  constructor(contest_code: string, exam_number: number) {
    this.id = uuidv4();
    this.contest_code = contest_code;
    this.exam_number = exam_number;
    this.subjects = [];
  }
}