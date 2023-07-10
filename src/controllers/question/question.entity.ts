/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  user: string;

  @Column({ default: null })
  cycle: string;

  @Column()
  school_subject_name: string;

  @Column()
  school_subject_code: string;

  @Column()
  content: string;

  @Column()
  quantity: number;

  @Column()
  hits: number;

  @Column({ default: null })
  mistakes: number;

  @Column({ default: null })
  comments: string;

  @Column({ type: 'date', default: () => 'now()' })
  created_date: Date;

  constructor(user: string, cycle: string, school_subject_name: string, school_subject_code: string, content: string, quantity: number, hits: number, mistakes: number, comments: string, created_date: Date) {
    this.user = user;
    this.cycle = cycle;
    this.school_subject_name = school_subject_name;
    this.school_subject_code = school_subject_code;
    this.content = content;
    this.quantity = quantity;
    this.hits = hits;
    this.mistakes = mistakes;
    this.comments = comments;
    this.created_date = created_date;
    this.id = uuidv4();
  }
}
