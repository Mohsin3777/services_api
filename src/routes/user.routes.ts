import { Router } from "express";
import { registerUser, getUsers,loginUser, updateUser } from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", getUsers);
router.patch("/:id", updateUser); // partial update

export default router;
