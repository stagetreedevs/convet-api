/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Register {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  duration: Date;
  
  @Column({default: null})
  notes: string;
  
  @Column({default: null})
  progress: number;
  
  @Column({default: null})
  pages_read: number;
  
  @Column({default: null})
  last_page: number;
  
  @Column({default: null})
  revision_number: number;

  constructor(
    type: string,
    school_subject_name: string,
    type_school_subject: string,
    stopwatch: Date,
    start_date: Date,
    start_time: Date,
    end_time: Date,
    duration: Date,
    notes: string,
    progress: number,
    pages_read: number,
    last_page: number,
    revision_number: number
    ) {
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
    this.last_page = last_page;
    this.revision_number = revision_number;
    this.id = uuidv4();
  }
}
