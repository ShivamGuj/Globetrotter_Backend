import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'float', default: 0, nullable: true })
  highScore: number;

  @CreateDateColumn()
  createdAt: Date;

  // Remove any potential conflicting columns
  @Column({ nullable: true, default: 0, name: 'correct_answers' })
  correctAnswers: number;

  @Column({ nullable: true, default: 0, name: 'incorrect_answers' })
  incorrectAnswers: number;
}
