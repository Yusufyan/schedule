import { IDoctors } from "src/entities/mst-doctors.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("mst_doctors")
export class Doctor implements IDoctors {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  doctors: string;

  @Column()
  day?: string;
  time_start?: Date;
  time_finish?: Date;
  quota?: number;
  status?: boolean;
  date?: Date;
  created_at?: Date;
  updated_at?: Date;
}
