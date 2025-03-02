import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('invitation')
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  inviterId: string;

  @Column()
  inviterName: string;

  @Column({ type: 'float', default: 0 })
  score: number;

  @Column({ nullable: true })
  gameMode: string;

  @Column({ nullable: true })
  message: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ nullable: true, default: false })
  expired: boolean;
}
