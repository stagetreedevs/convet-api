/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class EditModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    model_id: string;

    @Column()
    name: string;

    @Column('jsonb', { default: [] })
    materias: object[];

    constructor(
        name: string,
        user_id: string,
        model_id: string,
    ) {
        this.id = uuidv4();
        this.user_id = user_id;
        this.model_id = model_id;
        this.name = name;
        this.materias = [];
    }
}
