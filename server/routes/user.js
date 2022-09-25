import express from "express";
import {
    deleteUser,
    getAllUsers,
    getUser,
    getUserByCity,
    checkAuthentication,
    updateUser,
} from "../controllers/user.controller.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE UserS

router.put("/:id", verifyUser, updateUser);

//DELETE UserS

router.delete("/:id", verifyUser, deleteUser);

//GET UserS

router.get("/find/:id", getUser);

//GET ALL  UserS IN A CITY

router.get("/", verifyUser, getUserByCity);

//check Auth
router.get("/checkauth", verifyToken, checkAuthentication);

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.status(200).json("You are authenticated and you can crud your account");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.status(200).json("You are authenticated and you can crud all account");
});

//GET ALL THE UserS
router.get("/all", verifyAdmin, getAllUsers);

export default router;
