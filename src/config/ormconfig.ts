import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Service } from "../entities/Service";
import { ServiceSlot } from "../entities/ServiceSlot";
import { Booking } from "../entities/Booking";
import { ServiceTemplate } from "../entities/ServiceTemplate";
import { Address } from "../entities/Address";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: 'root',
//  password: process.env.DB_PASSWORD,
  database: 'services_app',
  synchronize: true,
  logging: false,
  entities: [
    User,Service,ServiceSlot,Booking,ServiceTemplate,Address
  ],
});
