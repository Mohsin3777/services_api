import { createService,getServiceById,editService,getServiceWithUserId } from "../controllers/service.controller";
import { protect } from "../middlewares/authMiddleware";
import { Router } from "express";
const router = Router();


router.post("/", protect, createService);
router.get("/", protect, getServiceById);

router.patch("/update", protect, editService);

router.get("/getServiceWithUserId", protect, getServiceWithUserId);


export default router;
