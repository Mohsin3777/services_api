
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "./user.dto";
///Partial update DTO (for PATCH)


export class UpdateUserDto {
    @IsOptional()
    @IsString()
    firstName?: string;


    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsEnum(UserRole, { message: `role must be one of: ${Object.values(UserRole).join(", ")}` })
    role?: UserRole;

    @IsOptional()
    @IsString()
    providerType?: string;

    // free-form provider fields: clients/providers can send `providerMeta` as a plain object
    @IsOptional()
    providerMeta?: Record<string, any>;



    
}