import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";
import foodRoute from "./routes/food.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import order from "./routes/order.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.log(error);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection DISCONNECTED");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB CONNECTED");
});

//middleware
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/food", foodRoute);
app.use("/api/order", order);

//error handeling middlewares

app.use((error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong";

    return res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        status: errorStatus,
        stack: error.stack,
    });
});

app.listen(8000, () => {
    connectDB();
    console.log("Server is running on port 8000");
});
