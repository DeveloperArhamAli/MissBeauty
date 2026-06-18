import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
import { Wishlist } from "../models/wishlist.model.js";
import { Cart } from "../models/cart.model.js";
import { Category } from "../models/category.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import mongoose from "mongoose";
import fs from "fs";

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
        if (result.status === "fulfilled" && result.value.success) {
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
            if (result.status === "fulfilled" && result.value.success) {
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
        if (result.status === "rejected" || result.status === "fulfilled" && !result.value.success) {
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

const getAllProducts = asyncHandler( async (req, res) => {
    const {
        page = 1,
        limit = 12,
        sort = "-createdAt",
        category,
        brand,
        minPrice,
        maxPrice,
        search,
        inStock,
        hasDiscount,
        minRating,
        maxRating,
    } = req.query;
    
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const matchStage = {};

    if (category) {
        if (mongoose.Types.ObjectId.isValid(category)) {
            matchStage.categories = mongoose.Types.ObjectId(category);
        } else {
            const categoryDoc = await Category.findOne({ name: category });
            if (categoryDoc) {
                matchStage.categories = categoryDoc._id;
            }
        }
    }

    if (brand) {
        matchStage.brand = { $regex: brand, $options: 'i' };
    }

    if (minPrice || maxPrice) {
        matchStage.price = {};
        if (minPrice) matchStage.price.$gte = Number(minPrice);
        if (maxPrice) matchStage.price.$lte = Number(maxPrice);
    }

    if (inStock === 'true') {
        matchStage.stock = { $gt: 0 };
    }

    if (hasDiscount === 'true') {
        matchStage.discount = { $gt: 0 };
    }

    if (search) {
        matchStage.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { brand: { $regex: search, $options: 'i' } }
        ];
    }

    let sortObj = { createdAt: -1 };
    if (sort) {
        sortObj = {};
        sort.split(',').forEach(field => {
            let direction = 1;
            if (field.startsWith('-')) {
                direction = -1;
                field = field.substring(1);
            }
            sortObj[field] = direction;
        });
    }

    const aggregationPipeline = [
        { $match: matchStage },
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'productId',
                as: 'reviews'
            }
        },
        {
            $addFields: {
                averageRating: {
                    $cond: {
                        if: { $eq: [{ $size: '$reviews' }, 0] },
                        then: 0,
                        else: { $avg: '$reviews.rating' }
                    }
                },
                reviewCount: { $size: '$reviews' },
                finalPrice: {
                    $cond: {
                        if: { $gt: ['$discount', 0] },
                        then: { $subtract: ['$price', '$discount'] },
                        else: '$price'
                    }
                },
                discountPercentage: {
                    $cond: {
                        if: { $gt: ['$discount', 0] },
                        then: { $multiply: [{ $divide: ['$discount', '$price'] }, 100] },
                        else: 0
                    }
                }
            }
        }
    ];

    if (minRating || maxRating) {
        const ratingMatch = {};
        if (minRating) ratingMatch.averageRating = { $gte: Number(minRating) };
        if (maxRating) ratingMatch.averageRating = { ...ratingMatch.averageRating, $lte: Number(maxRating) };
        aggregationPipeline.push({ $match: ratingMatch });
    }

    const countPipeline = [...aggregationPipeline];
    const countResult = await Product.aggregate([
        ...countPipeline,
        { $count: 'total' }
    ]);
    const totalProducts = countResult[0]?.total || 0;

    aggregationPipeline.push(
        { $sort: sortObj },
        { $skip: skip },
        { $limit: limitNum },
        {
            $lookup: {
                from: 'categories',
                localField: 'categories',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                price: 1,
                discount: 1,
                finalPrice: 1,
                discountPercentage: { $round: ['$discountPercentage', 0] },
                stock: 1,
                brand: 1,
                variants: 1,
                sizes: 1,
                images: 1,
                createdAt: 1,
                averageRating: { $round: ['$averageRating', 0] },
                reviewCount: 1,
                categoryDetails: { name: 1, _id: 1 }
            }
        }
    );

    const products = await Product.aggregate(aggregationPipeline);

    const priceRangeResult = await Product.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: null,
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        }
    ]);

    const availableBrands = await Product.distinct('brand', matchStage);
    const availableCategories = await Category.find({}).select('name _id');

    const totalPages = Math.ceil(totalProducts / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    return res
            .status(200)
            .json(new ApiResponse(
                200,
                {
                    products,
                    pagination: {
                        currentPage: pageNum,
                        totalPages,
                        totalProducts,
                        limit: limitNum,
                        hasNextPage,
                        hasPrevPage,
                        nextPage: hasNextPage ? pageNum + 1 : null,
                        prevPage: hasPrevPage ? pageNum - 1 : null,
                    },
                    filters: {
                        availableCategories,
                        availableBrands,
                        priceRange: priceRangeResult[0] ? {
                            min: priceRangeResult[0].minPrice,
                            max: priceRangeResult[0].maxPrice
                        } : { min: 0, max: 0 },
                    }
                },
                "Products fetched successfully"
            ));
} )

const getProductById = asyncHandler( async (req, res) => {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await Product.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(productId) }
        },
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'productId',
                as: 'reviews'
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categories',
                foreignField: '_id',
                as: 'categoryDetails'
            }
        },
        {
            $addFields: {
                averageRating: {
                    $cond: {
                        if: { $eq: [{ $size: '$reviews' }, 0] },
                        then: 0,
                        else: { $avg: '$reviews.rating' }
                    }
                },
                reviewCount: { $size: '$reviews' },
                finalPrice: {
                    $cond: {
                        if: { $gt: ['$discount', 0] },
                        then: { $subtract: ['$price', '$discount' ] },
                        else: '$price'
                    }
                },
                discountPercentage: {
                    $cond: {
                        if: { $gt: ['$discount', 0] },
                        then: { $multiply: [{ $divide: ['$discount', '$price'] }, 100] },
                        else: 0
                    }
                }
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                price: 1,
                discount: 1,
                finalPrice: { $round: ['$finalPrice', 0] },
                discountPercentage: { $round: ['$discountPercentage', 0] },
                stock: 1,
                brand: 1,
                variants: 1,
                sizes: 1,
                images: 1,
                averageRating: { $round: ['$averageRating', 0] },
                reviewCount: 1,
                inStock: { $gt: ['$stock', 0] },
                categoryDetails: { name: 1, _id: 1 },
                reviews: {
                    _id: 1,
                    rating: 1,
                    title: 1,
                    comment: 1,
                    userId: 1,
                    createdAt: 1
                }
            }
        }
    ]);

    if (!product || product.length === 0) {
        throw new ApiError(404, "Product not found");
    }

    return res
            .status(200)
            .json(new ApiResponse(
                200,
                product[0],
                "Product fetched successfully"
            ));
} )

export {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById
}