import { AppDataSource } from "../config/ormconfig";
import { User } from "../entities/user";
import { UserDto, UserRole } from "../dtos/user.dto";
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { UpdateUserDto } from "../dtos/update_user.dto";
import merge from "lodash/merge";
import { ProviderMeta } from "../interface/provider-meta.interface";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async register(data: UserDto) {
  

   if (!data.firstName || !data.lastName || !data.email || !data.password)
 throw new Error("Enter required fields");

  const exists = await this.userRepo.findOne({ where: { email: data.email } });

    console.log(exists)
    if (exists) throw new Error("Email already exists");
    const hashed = await bcrypt.hash(data.password!, 10);

    const user = this.userRepo.create({
      firstName: data.firstName,
      lastName:data.lastName,
      email: data.email,
      password: hashed,
      role: data.role,
      providerType: data.providerType
    });

    return await this.userRepo.save(user);
  }

  

//   async getAll() {
//     return await this.userRepo.find();
//   }


async getAll({ offset, limit, sortBy, order, page }: { offset:number; limit:number; sortBy:string; order:"ASC"|"DESC"; page:number }) {
    const [data, total] = await this.userRepo.findAndCount({
      order: { [sortBy]: order },
      skip: offset,
      take: limit
    });
    return { data, total, page, limit };
  }



  async findByName(firstName: string) {
    return await this.userRepo.findOne({ where: {firstName:firstName } });
  }


    async login(email: string, password:string) {
    const user = await this.userRepo.findOne({ where: {email:email } });

    if(!user)
           throw new Error("user not exists");

        const isMatch = await bcrypt.compare(password, user?.password!);

         if (!isMatch)
            throw new Error("Invalid credentials.");

          const token = jwt.sign(
      { id: user?.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    user.token=token;

    return  {user};

  }



  
  async update(id: number, payload: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new Error("User not found");

    // --- Validate role change safely ---
    if (payload.role && !Object.values(UserRole).includes(payload.role)) {
      throw new Error(`Invalid role. Allowed: ${Object.values(UserRole).join(", ")}`);
    }

    // --- Hash password if provided ---
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    // Prepare shallow fields (remove undefined fields)
    const updatable: Record<string, any> = {};
    for (const key of Object.keys(payload)) {
      const value = (payload as any)[key];
      if (value !== undefined) updatable[key] = value;
    }

    // --- Merge providerMeta deeply if provided ---
    if (payload.providerMeta) {
      const existing = user.providerMeta || {};
      updatable.providerMeta = merge({}, existing, payload.providerMeta as ProviderMeta);
    }

    // Merge values safely
    const mergedUser = this.userRepo.merge(user, updatable);

    return await this.userRepo.save(mergedUser);
  }

}








export const userService = new UserService();
