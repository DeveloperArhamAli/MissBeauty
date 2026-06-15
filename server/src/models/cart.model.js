import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CartItem"
        }
    ]
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);