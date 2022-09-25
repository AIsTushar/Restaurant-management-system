import express from "express";
import {
    login,
    register,
    userProfile,
    updateUser,
} from "../controllers/auth.controller.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/user", verifyUser, userProfile);

router.post("/updateUser", verifyUser, updateUser);

export default router;
