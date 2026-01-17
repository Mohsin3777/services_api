import { createService,getServiceById,editService,getServiceWithUserId ,getRandomServicesList} from "../controllers/service.controller";
import { protect } from "../middlewares/authMiddleware";
import { Router } from "express";
const router = Router();


router.post("/", protect, createService);
router.get("/", protect, getServiceById);

router.patch("/update", protect, editService);

router.get("/getServiceWithUserId", protect, getServiceWithUserId);
router.get("/getRandomServicesList", protect, getRandomServicesList);


export default router;
