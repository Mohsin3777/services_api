// dto/create-service.dto.ts
import { IsString, IsOptional, IsArray, ValidateNested, IsObject, IsBoolean, IsDate, MinDate } from "class-validator";
import { Type } from "class-transformer";

export class SlotDto {
  @IsString()
  day!: string;

  @IsString()
  startTime!: string;

  @IsString()
  endTime!: string;


  //   @IsString()
  // slotDate!: string;
    // ✅ Convert string → Date
  @Type(() => Date)
  @IsDate()
  @MinDate(new Date(), {
    message: "slotDate cannot be in the past",
  })
  slotDate!: Date;

    @IsOptional()
  @IsBoolean()
  isRecurring?: boolean = false;

    @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

export class CreateServiceDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  image?: string;

   @IsOptional()
  @IsString()
  price?: number;

   @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  // Flexible meta: pricing, durations, categories, etc.
  @IsOptional()
  @IsObject()
  serviceMeta?: Record<string, any>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotDto)
  slots!: SlotDto[];
}
