import { IDoctors } from "src/entities/mst-doctors.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("mst_doctors")
export class Doctor implements IDoctors {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  doctor_name?: string;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  updated_at?: Date;
}
