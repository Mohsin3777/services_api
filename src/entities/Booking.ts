// entities/Booking.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn
} from "typeorm";
import { User } from "./user";
import { Service } from "./Service";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User; // who booked

  @ManyToOne(() => Service)
  service!: Service;

  @Column()
  day!: string;

  @Column()
  startTime!: string;

  @Column()
  endTime!: string;

  @Column({ type: "enum", enum: ["PENDING", "CONFIRMED", "CANCELLED"], default: "PENDING" })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
