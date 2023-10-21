/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Register {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  user: string;

  @Column({ default: null })
  cycle: string;

  @Column()
  type: string;

  @Column()
  school_subject_name: string;

  @Column({ default: null })
  school_subject_code: string;

  @Column()
  type_school_subject: string;

  @Column({ default: null })
  workbook: string;

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
  revision_number: number;

  @Column({ default: null })
  videos_watched: string;

  @Column({ default: null })
  qtd_questions: string;

  @Column({ default: null })
  questions_hits: string;

  //FINISHED CARD AUX
  @Column({
    type: 'time',
    default: () => "'00:00:00'",
  })
  duration_cycle_card: string;

  @Column({ default: null })
  id_cycle_card: string;

  constructor(
    user: string,
    type: string,
    cycle: string,
    school_subject_name: string,
    school_subject_code: string,
    type_school_subject: string,
    workbook: string,
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
    revision_number: number,
    videos_watched: string,
    qtd_questions: string,
    questions_hits: string,
    duration_cycle_card: string,
    id_cycle_card: string

  ) {
    this.user = user;
    this.type = type;
    this.cycle = cycle;
    this.school_subject_name = school_subject_name;
    this.school_subject_code = school_subject_code;
    this.type_school_subject = type_school_subject;
    this.workbook = workbook;
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
    this.duration_cycle_card = duration_cycle_card;
    this.id_cycle_card = id_cycle_card;
    this.id = uuidv4();
  }
}
