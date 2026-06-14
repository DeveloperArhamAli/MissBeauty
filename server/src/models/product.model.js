import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new mongoose.Schema({
    images: [
        {
            type: {
                public_id: String,
                url: String,
            }, 
            required: true
        }
    ],
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    brand: {
        type: String,
        required: true
    },
    variants: [
        {
            type: String,
            required: true
        }
    ],
    sizes: [
        {
            type: String,
            required: true
        }
    ],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    ],
}, { timestamps: true });

productSchema.plugin(mongooseAggregatePaginate);

export const Product = mongoose.model("Product", productSchema);