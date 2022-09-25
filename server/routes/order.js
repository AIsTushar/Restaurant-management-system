import express from "express";
import Order from "../models/Orders.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE ORDER

router.post("/", verifyUser, async (req, res) => {
    console.log(req.body);
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all orders

router.get("/", verifyAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get user orders

router.get("/find/:userId", verifyUser, async (req, res) => {
    console.log(req.params.userId);
    try {
        const orders = await Order.find({ userid: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
