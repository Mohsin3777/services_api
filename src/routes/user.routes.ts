import { Router } from "express";
import { registerUser, getUsers,loginUser, updateUser ,getUserWithId} from "../controllers/user.controller";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", getUsers);
router.get("/user",protect, getUserWithId);

router.patch("/:id", updateUser); // partial update

export default router;
