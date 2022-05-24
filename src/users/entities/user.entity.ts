import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  constructor(name: string, lastName: string, email: string, password: string) {
    this.Name = name;
    this.LastName = lastName;
    this.Email = email;
    this.Password = password; //hashed
  }

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
