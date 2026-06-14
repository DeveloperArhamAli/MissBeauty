import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "confirmed", "processing", "shipped", "delivered"]
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderProduct",
            required: true
        }
    ],
    subTotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    shippingFee: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ["pending", "paid", "failed", "refunded"]
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["cod", "card", "stripe", "paypal"]
    },
    address: {
        type: {
            addressLine1: String,
            zipCode: String,
            city: String,
            country: String,
        },
        required: true
    }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);