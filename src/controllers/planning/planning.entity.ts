/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Planning {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  user: string;

  @Column()
  school_subject_code: string;

  @Column()
  school_subject_name: string;

  @Column({ default: null })
  qtd_hours: string;

  @Column({ default: null })
  qtd_videos: string;

  @Column({ default: null })
  total_pg: string;

  constructor(
    user: string,
    school_subject_code: string,
    school_subject_name: string,
    qtd_hours: string,
    qtd_videos: string,
    total_pg: string
  ) {
    this.user = user;
    this.school_subject_code = school_subject_code;
    this.school_subject_name = school_subject_name;
    this.qtd_hours = qtd_hours;
    this.qtd_videos = qtd_videos;
    this.total_pg = total_pg;
    this.id = uuidv4();
  }
}
