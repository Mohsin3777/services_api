import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { AddressDto } from "./address.dto";
export enum UserRole {
  USER = "USER",
  PROVIDER = "PROVIDER",
  ADMIN="ADMIN"
}


export enum UserStatus { Active="Active" ,Delete= "Delete" ,Block= "Block"}

export class UserDto {

  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsEnum(UserRole, { message: `role must be one of: ${Object.values(UserRole).join(", ")}` })
  role?: UserRole = UserRole.USER;


  @IsOptional()
  @IsString()
  providerType?: string;


 // ✅ Address (Optional)
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
  
}



