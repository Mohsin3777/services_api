import { createService,getServiceById,editService } from "../controllers/service.controller";
import { protect } from "../middlewares/authMiddleware";
import { Router } from "express";
const router = Router();


router.post("/", protect, createService);
router.get("/", protect, getServiceById);

router.patch("/update", protect, editService);

export default router;
