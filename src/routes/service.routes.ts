import { createService } from "../controllers/service.controller";
import { protect } from "../middlewares/authMiddleware";
import router from "./user.routes";

router.post("/", protect, createService);


export default router;
