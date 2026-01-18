// entities/Address.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  addressLine?: string;

  @Column("decimal", { precision: 10, scale: 7, nullable: true })
  latitude?: number;

  @Column("decimal", { precision: 10, scale: 7, nullable: true })
  longitude?: number;

  // 🔗 Relation
  @ManyToOne(() => User, user => user.address, {
    onDelete: "CASCADE",
  })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}