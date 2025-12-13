import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ServiceSlot } from "./ServiceSlot";
import { User } from "./user";
import { ServiceTemplate } from "./ServiceTemplate";


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


    @Column("decimal", { precision: 10, scale: 2, nullable: true })
  price!: number;

    @Column({ default: true })
  isActive!: boolean;

  // future fields: pricing, location, categories, rules...
  @Column({ type: "json", nullable: true })
  serviceMeta?: Record<string, any>;

  @ManyToOne(() => User, (user) => user.services, {
    onDelete: "CASCADE",  // optional
    eager: false
  })
  provider!: User;



  @OneToMany(() => ServiceSlot, slot => slot.service, { cascade: true,

    eager: false
   })
  slots!: ServiceSlot[];


    // Template slots (for recurring patterns)
  @OneToMany(() => ServiceTemplate, template => template.service, {
    cascade: true,
    eager: false
  })
  templates!: ServiceTemplate[];


   @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
