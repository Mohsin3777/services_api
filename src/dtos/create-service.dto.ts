// dto/create-service.dto.ts
import { IsString, IsOptional, IsArray, ValidateNested, IsObject } from "class-validator";
import { Type } from "class-transformer";

class SlotDto {
  @IsString()
  day!: string;

  @IsString()
  startTime!: string;

  @IsString()
  endTime!: string;
}

export class CreateServiceDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  image?: string;

  // Flexible meta: pricing, durations, categories, etc.
  @IsOptional()
  @IsObject()
  serviceMeta?: Record<string, any>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotDto)
  slots!: SlotDto[];
}
