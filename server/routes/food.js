import express from "express";
import Food from "../models/Food.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE FOOD

router.post("/", verifyAdmin, async (req, res) => {
    const newFood = new Food(req.body);
    try {
        const savedFood = await newFood.save();
        res.status(200).json(savedFood);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE FOOD
router.put("/:id", verifyAdmin, async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (food.userId === req.body.userId) {
            await food.updateOne({ $set: req.body });
            res.status(200).json("The food has been updated");
        } else {
            res.status(403).json("You can update only your food");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE FOOD
router.delete("/:id", verifyAdmin, async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (food.userId === req.body.userId) {
            await food.deleteOne();
            res.status(200).json("The food has been deleted");
        } else {
            res.status(403).json("You can delete only your food");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET FOOD
router.get("/find/:id", async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        res.status(200).json(food);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all
router.get("/", async (req, res) => {
    const food = await Food.find();
    res.status(200).json(food);
});

//get food by type
router.get("/type/:type", async (req, res) => {
    try {
        const food = await Food.find({ type: req.params.type });
        res.status(200).json(food);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all the type
router.get("/types", async (req, res) => {
    try {
        const types = await Food.find().distinct("type");
        res.status(200).json(types);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get top 5 top rated food

router.get("/top", async (req, res) => {
    try {
        const food = await Food.find().sort({ rating: -1 }).limit(5);
        res.status(200).json(food);
    } catch (err) {
        res.status(500).json(err);
    }
});










export default router;
