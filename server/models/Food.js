import mongoose from "mongoose";
const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
    },
    description: {
        type: String,
        required: false,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
});

export default mongoose.model("Food", FoodSchema);


