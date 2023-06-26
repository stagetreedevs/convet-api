/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: null })
  cpf: string;

  @Column({ default: null })
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor(name: string, cpf: string, phone: string, email: string, password: string) {
    this.name = name;
    this.cpf = cpf;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.id = uuidv4();
  }
}
