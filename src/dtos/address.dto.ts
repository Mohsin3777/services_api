// dto/address.dto.ts
import { IsOptional, IsString, IsNumber, Min, Max } from "class-validator";
import { Type } from "class-transformer";

export class AddressDto {
  @IsOptional()
  @IsString()
  addressLine?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  // @Min(-90)
  // @Max(90)
  latitude?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  // @Min(-180)
  // @Max(180)
  longitude?: number;
}
