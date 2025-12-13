// entities/Booking.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./user";
import { Service } from "./Service";
import { ServiceSlot } from "./ServiceSlot";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  // who booked
  @ManyToOne(() => User, { nullable: false })
  user!: User;

  // booked service
  @ManyToOne(() => Service, { nullable: false })
  service!: Service;

  // booked slot
  @ManyToOne(() => ServiceSlot, slot => slot.bookings, {
    nullable: false,
  })
  serviceSlot!: ServiceSlot;

  @Column()
  day!: string;

  @Column()
  startTime!: string;

  @Column()
  endTime!: string;

  @Column({
    type: "enum",
    enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
    default: "CONFIRMED",
  })
  status!: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: "json", nullable: true })
  bookingDetails?: {
    notes?: string;
    specialRequirements?: string;
    attendees?: number;
  };

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
