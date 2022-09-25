import express from "express";
import {
    createHotel,
    deleteHotel,
    getAllHotels,
    getHotel,
    getHotelByCity,
    getUniqueCityInHotails,
    updateHotel,
} from "../controllers/hotel.controller.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE HOTELS

router.post("/", verifyAdmin, createHotel);

//UPDATE HOTELS

router.put("/:id", verifyAdmin, updateHotel);

//DELETE HOTELS

router.delete("/:id", verifyAdmin, deleteHotel);

//GET HOTELS

router.get("/find/:id", getHotel);

//GET ALL  HOTELS IN A CITY

router.get("/", getHotelByCity);

//GET ALL THE HOTELS
router.get("/all", getAllHotels);

router.get("/getCities", getUniqueCityInHotails);

export default router;
