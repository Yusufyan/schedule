import { IUsers } from "src/entities/mst-users.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("mst_users")
export class Users implements IUsers {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 20, nullable: false })
  username?: string;

  @Column({ length: 50, nullable: false })
  email?: string;

  @Column({ nullable: false })
  password?: string;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
  updated_at?: Date;
}
