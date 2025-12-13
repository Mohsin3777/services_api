// dto/create-booking.dto.ts
import { IsNumber, IsString } from "class-validator";

export class CreateBookingDto {
  @IsNumber()
  serviceId!: number;
  @IsNumber()
  serviceSlotId!: number;

    @IsNumber()
  providerId!: number;

  bookingDetails?: {
    notes?: string;
    specialRequirements?: string;
    attendees?: number;
  }
}
