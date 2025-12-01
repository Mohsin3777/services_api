import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { ServiceSlot } from "./ServiceSlot";
import { User } from "./user";


@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ nullable: true })
  image!: string;

  // future fields: pricing, location, categories, rules...
  @Column({ type: "json", nullable: true })
  serviceMeta?: Record<string, any>;

  @ManyToOne(() => User, (user) => user.services, {
    onDelete: "CASCADE",  // optional
  })
  provider!: User;

  @OneToMany(() => ServiceSlot, slot => slot.service, { cascade: true })
  slots!: ServiceSlot[];
}
