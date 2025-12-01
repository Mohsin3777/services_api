import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Service } from "../entities/Service";
import { ServiceSlot } from "../entities/ServiceSlot";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: 'root',
//  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    User,Service,ServiceSlot
  ],
});
