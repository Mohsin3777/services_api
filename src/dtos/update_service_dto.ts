// dto/create-service.dto.ts
import { IsString, IsOptional, IsArray, ValidateNested, IsObject, IsBoolean, IsNumber } from "class-validator";
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


    @IsString()
  slotDate!: string;

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
