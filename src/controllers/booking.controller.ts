// controllers/booking.controller.ts
import { Request, Response } from "express";
import { validateBody } from "../middlewares/validate";
import { CreateBookingDto } from "../dtos/create-booking.dto";
import { BookingService } from "../services/booking.service";
import { ApiResponse } from "../utils/ApiResponse";
import { AuthRequest } from "../middlewares/authMiddleware";
import { buildPaginationResponse, parsePagination } from "../utils/pagination";

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


export const getUserBookings = async (_req: AuthRequest, res: Response) => {
  try {
            var userId = Number(_req.user?.id);
        const { page, limit, sortBy, order, offset } = parsePagination(_req.query);
            const { data, total } = await bookingService.getMyBookingList({userId, offset, limit, sortBy, order, page });
    return ApiResponse.success(res, buildPaginationResponse(data, page, limit, total));


    
  } catch (error) {
    return ApiResponse.error(res, "Server error", error);
  }
};
