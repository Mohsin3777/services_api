// src/dtos/provider-meta.dto.ts
import { Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  Min,
  Max,
  IsIn,
  ArrayNotEmpty,
  IsObject,
} from "class-validator";

export class TimeSlotDto {
  @IsString()
  @IsNotEmpty()
  start!: string; // consider regex HH:mm validation later

  @IsString()
  @IsNotEmpty()
  end!: string;

  @IsOptional()
  @IsInt()
  durationMinutes?: number;

  @IsOptional()
  @IsInt()
  capacity?: number;
}

export class DayAvailabilityDto {
  @IsString()
  @IsIn(["monday","tuesday","wednesday","thursday","friday","saturday","sunday"])
  day!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeSlotDto)
  slots!: TimeSlotDto[];

  @IsOptional()
  active?: boolean = true;
}

export class PriceRangeDto {
  @IsNumber()
  min!: number;

  @IsNumber()
  max!: number;

  @IsOptional()
  @IsString()
  currency?: string;
}

export class DocumentMetaDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  uploadedAt?: string;
}

export class ProviderMetaDto {
  @IsOptional()
  @IsString()
  shortBio?: string;

  @IsOptional()
  @IsString()
  businessName?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  servicesOffered?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @IsOptional()
  @IsInt()
  yearsOfExperience?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => PriceRangeDto)
  priceRange?: PriceRangeDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayAvailabilityDto)
  availability?: DayAvailabilityDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentMetaDto)
  documents?: DocumentMetaDto[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;
}





// {
//   "shortBio": "I have 6 years experience repairing AC units of all major brands.",
//   "businessName": "CoolFix Karachi",
//   "servicesOffered": ["AC Repair", "AC Installation", "AC Maintenance"],
//   "languages": ["en", "ur"],
//   "yearsOfExperience": 6,
//   "priceRange": { "min": 1500, "max": 5000, "currency": "PKR" },
//   "availability": [
//     {
//       "day": "monday",
//       "slots": [
//         { "start": "09:00", "end": "11:00", "durationMinutes": 30, "capacity": 1 },
//         { "start": "14:00", "end": "16:00", "durationMinutes": 30 }
//       ],
//       "active": true
//     },
//     {
//       "day": "saturday",
//       "slots": [
//         { "start": "10:00", "end": "12:00", "durationMinutes": 30 }
//       ],
//       "active": false
//     }
//   ],
//   "documents": [
//     { "id": "file_123", "type": "license", "url": "/uploads/license.pdf", "uploadedAt": "2025-11-01T08:00:00Z" }
//   ],
//   "settings": { "autoAccept": false }
// }
