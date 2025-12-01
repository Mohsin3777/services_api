import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Service } from "./Service";

@Entity()
export class ServiceSlot {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  day!: string; // mon, tue, wed...

  @Column()
  startTime!: string; // "10:00"

  @Column()
  endTime!: string; // "12:00"

  @ManyToOne(() => Service, service => service.slots)
  service!: Service;
}
