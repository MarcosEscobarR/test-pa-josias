import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JoinColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column({ length: 100 })
  Title: string;
  @Column({ length: 255 })
  Description: string;
  @CreateDateColumn()
  CreatedAt: Date;
  @DeleteDateColumn()
  IsDeleted: Date;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'UserId' })
  User: User;
  @Column()
  UserId: number;
}
