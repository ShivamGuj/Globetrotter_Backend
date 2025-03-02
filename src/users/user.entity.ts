import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ default: 0 })
  correct_answers: number;

  @Column({ default: 0 })
  incorrect_answers: number;

  @CreateDateColumn()
  created_at: Date;
}
