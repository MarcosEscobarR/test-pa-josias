import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryColumn()
  Id: number;
  @Column({ length: 100 })
  Title: string;
  @Column({ length: 255 })
  Description: string;
  @Column()
  CreatedAt: Date;
  @Column()
  IsDeleted: boolean;
}
