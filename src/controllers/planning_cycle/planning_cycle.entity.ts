/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class PlanningCycle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  school_subject_code: string;

  @Column()
  school_subject_name: string;

  @Column()
  progress: string;

  @Column({ default: null })
  total_pages: string;

  @Column({ default: null })
  pages_read: string;

  @Column({ default: null })
  current_page: string;

  @Column({ default: null })
  last_page: string;

  @Column({ default: null })
  revision_number: string;

  @Column({ default: null })
  questions: string;

  @Column({ default: null })
  questions_hits: string;

  @Column({
    type: 'time',
    default: () => "'00:00:00'",
  })
  study_time: Date;

  constructor(
    school_subject_code: string,
    school_subject_name: string,
    progress: string,
    total_pages: string,
    pages_read: string,
    current_page: string,
    last_page: string,
    revision_number: string,
    questions: string,
    questions_hits: string,
    study_time: Date,
  ) {
    this.school_subject_code = school_subject_code;
    this.school_subject_name = school_subject_name;
    this.progress = progress;
    this.total_pages = total_pages;
    this.pages_read = pages_read;
    this.current_page = current_page;
    this.last_page = last_page;
    this.revision_number = revision_number;
    this.questions = questions;
    this.questions_hits = questions_hits;
    this.study_time = study_time;
    this.id = uuidv4();
  }
}
