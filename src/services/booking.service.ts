// services/booking.service.ts
import { AppDataSource } from "../config/ormconfig";
import { Booking } from "../entities/Booking";
import { Service } from "../entities/Service";
import { CreateBookingDto } from "../dtos/create-booking.dto";
import { ServiceSlot } from "../entities/ServiceSlot";

export class BookingService {
  bookingRepo = AppDataSource.getRepository(Booking);
  serviceRepo = AppDataSource.getRepository(Service);
       slotRepo = AppDataSource.getRepository(ServiceSlot);

  async create(userId: number, dto: CreateBookingDto) {

   return AppDataSource.transaction(async manager =>{
 const bookingRepo = manager.getRepository(Booking);
      const slotRepo = manager.getRepository(ServiceSlot);
      const serviceRepo = manager.getRepository(Service);


if(userId===dto.providerId){
          throw new Error("You cant book your service");

}

            // 1️⃣ Load slot
      const slot = await slotRepo.findOne({
        where: { id: dto.serviceSlotId },
        relations: { service: true },
      });

      console.log(slot)


         if (!slot) {
        throw new Error("Slot not found");
      }

      // 2️⃣ Ensure slot belongs to service
      if (slot.service.id !== dto.serviceId) {
        throw new Error("Slot does not belong to this service");
      }

      // 3️⃣ Check availability
      if (!slot.isAvailable) {
        throw new Error("Slot is not available");
      }

         // 4️⃣ Create booking
      const booking = bookingRepo.create({
        user: { id: userId } as any,
        service: slot.service,
        serviceSlot: slot,
        day: slot.day,
        startTime: slot.startTime,
        endTime: slot.endTime,
        amount: slot.service.price, // or calculate
        bookingDetails: dto.bookingDetails,
        status: "CONFIRMED",
      });

      await bookingRepo.save(booking);

      // 5️⃣ Mark slot unavailable
      slot.isAvailable = false;
      await slotRepo.save(slot);


            return booking;

   })
  }




  async getMyBookingList({userId, offset, limit, sortBy, order, page }: {userId:number, offset:number; limit:number; sortBy:string; order:"ASC"|"DESC"; page:number }) {
    const [data, total] = await this.bookingRepo.findAndCount({
        where: { user: { id: userId } }, // If it's a relation
    relations: ['user','service'], // Include user data if needed
      order: { [sortBy]: order },
      skip: offset,
      take: limit
    });
    return { data, total, page, limit };
  }





    async getBookingWithId({bookingId,userId }: {bookingId:number,userId:number }) {
    // const data = await this.bookingRepo.findOne({
    //     where: {  id:bookingId }, // If it's a relation
    // relations: ['user','service'], // Include user data if needed
  
    // });
    // return { data, };


        const bookingWithServiceAndSlots = await this.bookingRepo
        .createQueryBuilder("booking")
                .leftJoinAndSelect("booking.serviceSlot", "serviceSlot")

        
        .leftJoinAndSelect("booking.user", "user")
        .leftJoinAndSelect("booking.service", "service")
        .leftJoinAndSelect("service.slots", "slots") // Join service's slots
                        .leftJoinAndSelect("service.provider", "provider")

        .where("booking.id = :bookingId", { bookingId })
        // .andWhere("booking.userId = :userId", { userId }) // Optional: filter by user
        .getOne();

    console.log(bookingWithServiceAndSlots);
    return { booking: bookingWithServiceAndSlots };

  }
}
