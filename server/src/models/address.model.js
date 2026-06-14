import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: [
        {
            type: String,
            enum: ["shipping", "home", "work"],
        }
    ],
    isDefault: {
        type: Boolean,
        default: false
    }
})

export const Address = mongoose.model("Address", addressSchema);