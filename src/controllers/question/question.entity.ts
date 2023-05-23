/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  user: string;

  @Column()
  school_subject_name: string;
  
  @Column()
  content: string;

  @Column()
  quantity: number;

  @Column()
  hits: number;

  @Column({ default: null })
  mistakes: number;

  @Column({default: null})
  comments: string;

  @Column({ type: 'date', default: () => 'now()' })
  created_date: Date;

  constructor(user: string, school_subject_name: string, content: string, quantity: number, hits: number, mistakes: number, comments: string, created_date: Date) {
    this.user = user;
    this.school_subject_name = school_subject_name;
    this.content = content;
    this.quantity = quantity;
    this.hits = hits;
    this.mistakes = mistakes;
    this.comments = comments;
    this.created_date = created_date;
    this.id = uuidv4();
  }
}
