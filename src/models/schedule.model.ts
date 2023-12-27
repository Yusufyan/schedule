import { ISchedules } from "src/entities/schedule.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Doctor } from "./mst-doctor.model";
import { IDoctors } from "src/entities/mst-doctors.entity";

@Entity("schedule")
export class Schedule implements ISchedules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  day?: string;

  @Column()
  time_start?: string;

  @Column()
  time_end?: string;

  @Column()
  quota?: number;

  @Column()
  status?: boolean;

  @Column()
  date?: Date;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  updated_at?: Date;

  @ManyToOne(() => Doctor, (doctor) => doctor.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({
    name: "doctor",
    referencedColumnName: "id",
  })
  doctors: IDoctors;
}
