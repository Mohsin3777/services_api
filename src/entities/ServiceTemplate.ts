// entities/ServiceTemplate.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Service } from "./Service";

@Entity()
export class ServiceTemplate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] })
  dayOfWeek!: string;

  @Column()
  startTime!: string; // Format: "HH:MM"

  @Column()
  endTime!: string; // Format: "HH:MM"

  @Column({ type: "date" })
  validFrom!: Date; // When this template becomes active

  @Column({ type: "date", nullable: true })
  validUntil?: Date; // Optional end date

  @Column({ default: true })
  isRecurring!: boolean; // If false, it's a one-time slot

  @Column({ type: "date", nullable: true })
  specificDate?: Date; // For non-recurring slots

  // Link to parent service
  @ManyToOne(() => Service, service => service.templates, {
    onDelete: "CASCADE"
  })
  service!: Service;

  @CreateDateColumn()
  createdAt!: Date;
}