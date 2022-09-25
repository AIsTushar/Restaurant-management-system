import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
    {
        userid: { type: String, required: true },
        orderItems: [
            {
                id: { type: String, required: true },
                name: { type: String, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
            },
        ],
        shippingAddress: {
            address: { type: String, required: true },
        },
        paymentMethod: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);



export default mongoose.model("Order", OrderSchema);

