import fs from "fs";
import { Product } from "../models/product.model";
import { Review } from "../models/review.model";
import { Wishlist } from "../models/wishlist.model";
import { Cart } from "../models/cart.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary"

const createProduct = asyncHandler( async (req, res) => {
    const { name, description, price, discount, stock, brand, variants, sizes, categories } = req.body;
    if ([name, description, price, stock, brand, variants, sizes, categories].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are mandatory");
    }

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "Please upload at least one image");
    }

    const MAX_IMAGES = 6;
    if (req.files.length > MAX_IMAGES) {
        throw new ApiError(400, `You can upload a maximum of ${MAX_IMAGES} images`);
    }

    const localFilePaths = req.files.map(file => file.path);

    const uploadResults = await Promise.allSettled(
        localFilePaths.map(path => uploadOnCloudinary(path))
    );

    const successUploads = [];
    const failedUploads = [];

    uploadResults.forEach((result, index) => {
        if (result.status === "fulfilled" && result.value.sucess) {
            successUploads.push({
                url: result.value.data.secure_url,
                public_id: result.value.data.public_id
            });
        } else {
            failedUploads.push({
                index,
                filename: req.files[index].originalname,
                error: result.status === "fulfilled" ? result.value.error : result.reason
            })
        }
    });

    if (successUploads.length === 0) {
        throw new ApiError(500, "Failed to upload images. Please try again");
    }

    failedUploads.forEach(failed => {
        const filePath = localFilePaths[failed.index];
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    });

    const product = await Product.create({
        name,
        description,
        price: Number(price),
        discount: Number(discount),
        stock: Number(stock),
        brand,
        variants,
        sizes,
        categories,
        images: successUploads
    });

    return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    product,
                    `${failedUploads.length > 0 ? `Product created with ${successUploads.length} images. ${failedUploads.length} images failed to upload.` : "Prouduct created successfully"}`
                )
            )

} )

const updateProduct = asyncHandler( async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, discount, stock, brand, variants, sizes, categories } = req.body;

    const productToBeUpdated = await Product.findById(productId);
    if (!productToBeUpdated) {
        throw new ApiError(404, "Product not found");
    }

    const updates = {};

    if (name) updates.name = name;
    if (description) updates.description = description;
    if (price) updates.price = Number(price);
    if (discount) updates.discount = Number(discount);
    if (stock) updates.stock = Number(stock);
    if (brand) updates.brand = brand;
    if (variants) updates.variants = variants;
    if (sizes) updates.sizes = sizes;
    if (categories) updates.categories = categories;

    if (req.files && req.files.length > 0) {
        const MAX_IMAGES = 6;
        const currentImageCount = productToBeUpdated.images.length;
        const imagesToDelete = req.body.deleteImages ? JSON.parse(req.body.deleteImages) : [];

        const remainingImages = currentImageCount - imagesToDelete.length;
        const newImageCount = remainingImages + req.files.length;

        if (newImageCount > MAX_IMAGES) {
            throw new ApiError(400, `Maximum ${MAX_IMAGES} images allowed. You can add up to ${MAX_IMAGES - remainingImages} more.`);
        }

        const localFilePaths = req.files.map(file => file.path);

        const uploadResults = await Promise.allSettled(
            localFilePaths.map(path => uploadOnCloudinary(path))
        );

        const newlyUploaded = [];
        const failedUploads = [];

        uploadResults.forEach((result, index) => {
            if (result.status === "fulfilled" && result.value.sucess) {
                newlyUploaded.push({
                    url: result.value.data.secure_url,
                    public_id: result.value.data.public_id
                });
            } else {
                failedUploads.push({
                    index,
                    filename: req.files[index].originalname,
                    error: result.status === "fulfilled" ? result.value.error : result.reason
                })

                const filePath = localFilePaths[index];
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        });

        if (imagesToDelete.length > 0) {
            const deleteResults = await Promise.allSettled(
                imagesToDelete.map(public_id => deleteFromCloudinary(public_id))
            )

            deleteResults.forEach((result, index) => {
                if (result.status === "rejected") {
                    throw new ApiError(400, `Failed to delete image ${imagesToDelete[index]}`, result.reason);
                }
            })

            const updatedImages = productToBeUpdated.images
                .filter(img => !imagesToDelete.includes(img.public_id))
                .concat(newlyUploaded);

            if (updatedImages.length === 0) {
                throw new ApiError(400, "At least one image is required");
            }

            updates.images = updatedImages;
        }

        if (Object.keys(updates).length === 0 && !req.files) {
            throw new ApiError(400, "No fields provided for update")
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: updates },
            { 
                new: true,
            }
        )

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    updatedProduct,
                    `${failedUploads.length > 0 ? `Product updated with ${newlyUploaded.length} images. ${failedUploads.length} images failed to upload.` : "Prouduct updated successfully"}`
                )
            )
    }
} )

const deleteProduct = asyncHandler( async (req, res) => {
    const { productId } = req.params;

    const productToBeDeleted = await Product.findById(productId);
    if (!productToBeDeleted) {
        throw new ApiError(404, "Product not found");
    }

    const deleteResults = await Promise.allSettled(
        productToBeDeleted.images.map(img => deleteFromCloudinary(img.public_id))
    )

    deleteResults.forEach((result, index) => {
        if (result.status === "rejected" || result.status === "fulfilled" && !result.value.sucess) {
            throw new ApiError(400, `Failed to delete image ${productToBeDeleted.images[index]}`, result.reason);
        }
    })

    await Product.findByIdAndDelete(productId);
    await Review.deleteMany({ productId });
    await Cart.updateMany({ "products.productId": productId }, { $pull: { products: { productId } } });
    await Wishlist.updateMany({ "products.productId": productId }, { $pull: { products: { productId } } });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Product deleted successfully"
            )
        )
} )

export {
    createProduct,
    updateProduct,
    deleteProduct
}