import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class User {
  constructor(name: string, lastName: string, email: string, password: string) {
    this.Name = name;
    this.LastName = lastName;
    this.Email = email;
    this.Password = password; //hashed
  }

  @PrimaryGeneratedColumn()
  Id: number;
  @Column({ length: 50 })
  Name: string;
  @Column({ length: 50 })
  LastName: string;
  @Column({ length: 50 })
  Email: string;
  @Column({ length: 60, type: 'char' })
  Password: string;
  @OneToMany(() => Task, (t) => t.User)
  Tasks: Task[];
}
