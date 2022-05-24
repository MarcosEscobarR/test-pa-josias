import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  Id: number;
  @Column({ length: 50 })
  Name: string;
  @Column({ length: 50 })
  LastName: string;
  @Column({ length: 50 })
  Email: string;
  @Column({ length: 50 })
  Password: string;
}
