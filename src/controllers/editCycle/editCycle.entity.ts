/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class EditCycle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column('jsonb', { default: [] })
    materias: object[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    date: Date;

    constructor(
        user_id: string,
        date: Date
    ) {
        this.id = uuidv4();
        this.user_id = user_id;
        this.materias = [];
        this.date = date;
    }
}