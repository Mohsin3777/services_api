import { createService,getServiceById } from "../controllers/service.controller";
import { protect } from "../middlewares/authMiddleware";
import { Router } from "express";
const router = Router();


router.post("/", protect, createService);
router.get("/", protect, getServiceById);


export default router;
