import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: false,
        },

        address: {
            type: String,
            required: false,
        },

        city: {
            type: String,
            required: false,
        },

        mapLocaton: {
            type: String,
            required: false,
        },

        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isSuperAdmin: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", UserSchema);
