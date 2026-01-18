// dto/create-service.dto.ts
import { IsString, IsOptional, IsArray, ValidateNested, IsObject, IsBoolean, IsNumber, IsDate, MinDate, IsEnum } from "class-validator";
import { Type } from "class-transformer";

class SlotDto {
@IsOptional()
@IsNumber()
    id?: number;
  @IsString()
  day!: string;

  @IsString()
  startTime!: string;

  @IsString()
  endTime!: string;


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


     @IsNumber()
    serviceId!: number;
    @IsOptional()
@IsBoolean()
      isAvailable!: boolean;

}

export class UpdateServiceDto {
     @IsOptional()
  @IsString()
  title!: string;
 @IsOptional()
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
  isActive?: boolean ;

  // Flexible meta: pricing, durations, categories, etc.
  @IsOptional()
  @IsObject()
  serviceMeta?: Record<string, any>;
 @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotDto)
  slots!: SlotDto[];
}






export class UpdateSlotDto {
  // 🔑 Required for updating existing slot
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  day?: string;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  slotDate?: Date;

  // ❌ frontend should NOT control this
  // backend manages booking state
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsEnum(["ACTIVE", "CANCELLED", "MODIFIED"])
  status?: "ACTIVE" | "CANCELLED" | "MODIFIED";
}