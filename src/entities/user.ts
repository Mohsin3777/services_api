import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { ProviderMeta } from '../interface/provider-meta.interface';
import { Service } from './Service';


export type UserRole = "USER" | "PROVIDER";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;


  
  @Column({ nullable: true })
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true, nullable: true })
  phone!: string;

  @Column({ unique: true,nullable: true })
  email!: string;

  @Column()
  password!: string;
  @Column({nullable: true})
  profileImage!: string;


  @Column({ nullable: true})
  age!: number;


  @Column({ type: "enum", enum: ["USER", "PROVIDER"], default: "USER" })
  role!: UserRole;


  
  @Column({ nullable: true })
  providerType?: string; // massage, electrician, painter, etc.


 @Column({ default: false})
  profileSetup!: boolean;



  
  // store provider-specific dynamic data here (availability, bio, servicesMeta)
  @Column({ type: "json", nullable: true })
  providerMeta?: ProviderMeta;



    @Column({nullable: true})
  token!: string;


    @OneToMany(() => Service, (service) => service.provider)
  services!: Service[];



  



 


}
