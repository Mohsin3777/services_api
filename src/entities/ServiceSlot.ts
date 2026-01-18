import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Service } from "./Service";
import { Booking } from "./Booking";

@Entity()
export class ServiceSlot {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  day!: string;

  @Column()
  startTime!: string;

  @Column()
  endTime!: string;

  @Column()
  slotDate!: Date; // YYYY-MM-DD

  @ManyToOne(() => Service, service => service.slots, {
    nullable: false,
    onDelete: "CASCADE",
  })
  service!: Service;

  @Column({ default: true })
  isAvailable!: boolean;

  @Column({
    type: "enum",
    enum: ["ACTIVE", "CANCELLED", "MODIFIED"],
    default: "ACTIVE",
  })
  status!: "ACTIVE" | "CANCELLED" | "MODIFIED";

  @Column({ type: "json", nullable: true })
  metadata?: {
    generatedFromTemplateId?: number;
    originalTime?: string;
    notes?: string;
  };

  // ✅ One slot → many bookings
  @OneToMany(() => Booking, booking => booking.serviceSlot)
  bookings!: Booking[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
