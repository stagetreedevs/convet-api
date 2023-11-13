/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class ExamHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  exam_id: string;

  @Column()
  contest_code: string;

  @Column()
  exam_number: string;

  @Column('jsonb', { default: [] })
  subjects: object[];

  @Column({ type: 'date', default: () => 'now()' })
  created_at: Date;

  constructor(
    user_id: string,
    exam_id: string,
    contest_code: string,
    exam_number: string,
    created_at: Date
  ) {
    this.id = uuidv4();
    this.user_id = user_id;
    this.exam_id = exam_id;
    this.contest_code = contest_code;
    this.exam_number = exam_number;
    this.created_at = created_at;
    this.subjects = [];
  }
}