import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ nullable: true }) // Make password nullable temporarily
  password: string;

  // Other columns...
  // If you're removing these columns as shown in your error log, 
  // you should remove them from the entity too

  // If you want to keep some columns, make sure they match the database
  // Or add them with nullable: true to avoid schema sync issues
}
