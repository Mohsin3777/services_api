
import { IsBoolean, IsEmail, IsEnum, IsNumber, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { UserRole } from "./user.dto";
import { isFloat16Array } from "util/types";
import { ProviderMetaDto } from "./provider-meta.dto.ts";
import { Type } from "class-transformer";
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
    @IsString()
    profileImage?: string;


    @IsOptional()
    @IsNumber()
    age?: number;

    @IsOptional()
    @IsBoolean()
    profileSetup?: boolean;

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
     @ValidateNested()
  @Type(() => ProviderMetaDto)
    providerMeta?: ProviderMetaDto;




}