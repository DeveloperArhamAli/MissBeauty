import express from "express";
import { verifyAdmin } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById
} from "../controllers/product.controller";

const router = express.Router();

router.use(verifyAdmin)

router.post("/create", upload.array("images"), createProduct);
router.patch("/update/:productId", upload.array("images"), updateProduct);
router.delete("/delete/:productId", deleteProduct);

router.get("/", getAllProducts);
router.get("/:productId", getProductById);

export default router;