import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
export enum UserRole {
  USER = "USER",
  PROVIDER = "PROVIDER"
}


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
}



