// services/booking.service.ts
import { AppDataSource } from "../config/ormconfig";
import { Booking } from "../entities/Booking";
import { Service } from "../entities/Service";
import { CreateBookingDto } from "../dtos/create-booking.dto";

export class BookingService {
  bookingRepo = AppDataSource.getRepository(Booking);
  serviceRepo = AppDataSource.getRepository(Service);

  async create(userId: number, dto: CreateBookingDto) {

    console.log("Service Id  "+dto.serviceId)
    const service = await this.serviceRepo.findOne({
      where: { id: dto.serviceId },
        relations: ["slots"]
    });
    if (!service) throw new Error("Service not found");

    const slots = service.serviceMeta?.slots || [];

    const slotExists = slots.some(
      (s: any) =>
        s.day === dto.day &&
        s.startTime === dto.startTime &&
        s.endTime === dto.endTime
    );

    if (!slotExists)
      throw new Error("Invalid slot. This slot does not exist for this service");

    // Check if slot is available
    const conflict = await this.bookingRepo.findOne({
      where: {
        service: { id: dto.serviceId },
        day: dto.day,
        startTime: dto.startTime,
        endTime: dto.endTime,
        status: "CONFIRMED",
      },
    });

    if (conflict)
      throw new Error("This slot is already booked by another user");

    // Create booking
    const booking = this.bookingRepo.create({
      user: { id: userId },
      service: { id: dto.serviceId },
      day: dto.day,
      startTime: dto.startTime,
      endTime: dto.endTime,
      status: "CONFIRMED",
    });

    return await this.bookingRepo.save(booking);
  }
}
