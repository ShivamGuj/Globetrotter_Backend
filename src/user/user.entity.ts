import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ nullable: true }) // Keep password nullable for now
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'float', default: 0, nullable: true })
  highScore: number;

  @CreateDateColumn()
  createdAt: Date;

  // Add any other columns your user entity has, keeping them nullable
}
