// dto/create-booking.dto.ts
import { IsNumber, IsString } from "class-validator";

export class CreateBookingDto {
  @IsNumber()
  serviceId!: number;

  @IsString()
  day!: string;

  @IsString()
  startTime!: string;

  @IsString()
  endTime!: string;
}
