// controllers/booking.controller.ts
import { Request, Response } from "express";
import { validateBody } from "../middlewares/validate";
import { CreateBookingDto } from "../dtos/create-booking.dto";
import { BookingService } from "../services/booking.service";
import { ApiResponse } from "../utils/ApiResponse";
import { AuthRequest } from "../middlewares/authMiddleware";

const bookingService = new BookingService();

export const createBooking = [
  validateBody(CreateBookingDto),
  async (req: AuthRequest, res: Response) => {
    try {
            var id = req.user?.id;
console.log(id)

      const booking = await bookingService.create(Number(id), req.body);


          return ApiResponse.created(res, "Booking confirmed", booking);
      
   
    } catch (err: any) {
            return ApiResponse.badRequest(res, err.message);

    }
  },
];
