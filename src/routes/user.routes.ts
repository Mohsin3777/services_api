import { Router } from "express";
import { registerUser, getUsers,loginUser, updateUser ,getUserWithId,blockUnBlockUser} from "../controllers/user.controller";
import { protect } from "../middlewares/authMiddleware";
import { validateBody } from "../middlewares/validate";
import { UpdateUserDto } from "../dtos/update_user.dto";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", getUsers);
router.get("/user",protect, getUserWithId);

router.patch("/:id",protect,
    validateBody(UpdateUserDto),
    updateUser); // partial update




    router.patch("blockUnBlock/:id",protect,
    // validateBody(UpdateUserDto),
    blockUnBlockUser); // partial update

export default router;
