/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Register {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  user: string;

  @Column()
  type: string;

  @Column()
  school_subject_name: string;

  @Column()
  type_school_subject: string;

  @Column({
    type: 'time',
    default: () => "'00:00:00'",
  })
  stopwatch: Date;

  @Column({ type: 'date', default: () => 'now()' })
  start_date: Date;

  @Column({
    type: 'time',
    default: () => "'00:00:00'",
  })
  start_time: Date;

  @Column({
    type: 'time',
    default: () => "'00:00:00'",
  })
  end_time: Date;

  @Column({
    type: 'time',
    default: () => "'00:00:00'",
  })
  duration: string;

  @Column({ default: null })
  notes: string;

  @Column({ default: null })
  progress: string;

  @Column({ default: null })
  pages_read: string;

  @Column({ default: null })
  last_page_read: string;

  @Column({ default: null })
  last_page: string;

  @Column({ default: null })
  revision_number: string;

  @Column({ default: null })
  videos_watched: string;

  @Column({ default: null })
  qtd_questions: string;

  @Column({ default: null })
  questions_hits: string;

  constructor(
    user: string,
    type: string,
    school_subject_name: string,
    type_school_subject: string,
    stopwatch: Date,
    start_date: Date,
    start_time: Date,
    end_time: Date,
    duration: string,
    notes: string,
    progress: string,
    pages_read: string,
    last_page_read: string,
    last_page: string,
    revision_number: string,
    videos_watched: string,
    qtd_questions: string,
    questions_hits: string
  ) {
    this.user = user;
    this.type = type;
    this.school_subject_name = school_subject_name;
    this.type_school_subject = type_school_subject;
    this.stopwatch = stopwatch;
    this.start_date = start_date;
    this.start_time = start_time;
    this.end_time = end_time;
    this.duration = duration;
    this.notes = notes;
    this.progress = progress;
    this.pages_read = pages_read;
    this.last_page_read = last_page_read;
    this.last_page = last_page;
    this.revision_number = revision_number;
    this.videos_watched = videos_watched;
    this.qtd_questions = qtd_questions;
    this.questions_hits = questions_hits;
    this.id = uuidv4();
  }
}
