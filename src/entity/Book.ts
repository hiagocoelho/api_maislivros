import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    title: string;

    @Column({
        length: 50
    })
    author: string;
    
}