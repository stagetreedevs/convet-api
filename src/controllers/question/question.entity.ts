/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  school_subject_name: string;
  
  @Column()
  content: string;

  @Column()
  quantity: number;

  @Column()
  hits: number;

  @Column({default: null})
  comments: string;

  constructor(school_subject_name: string, content: string, quantity: number, hits: number, comments: string) {
    this.school_subject_name = school_subject_name;
    this.content = content;
    this.quantity = quantity;
    this.hits = hits;
    this.comments = comments;
    this.id = uuidv4();
  }
}
