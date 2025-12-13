// routes/booking.routes.ts
import { Router } from "express";
import { createBooking,getUserBookings } from "../controllers/booking.controller";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", protect, createBooking);
router.get("/getUserBookings", protect, getUserBookings);

export default router;
