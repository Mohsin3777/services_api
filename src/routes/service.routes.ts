import { createService,getServiceById,editService,getServiceWithUserId ,getRandomServicesList} from "../controllers/service.controller";
import { protect } from "../middlewares/authMiddleware";
import { Router } from "express";
import { validateBody } from "../middlewares/validate";
import { CreateServiceDto } from "../dtos/create-service.dto";
const router = Router();


router.post("/", protect,
    validateBody(CreateServiceDto),
    createService);
router.get("/", protect, getServiceById);

router.patch("/update", protect, editService);

router.get("/getServiceWithUserId", protect, getServiceWithUserId);
router.get("/getRandomServicesList", protect, getRandomServicesList);


export default router;
