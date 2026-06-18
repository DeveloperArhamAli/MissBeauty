import express from "express";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import * as productController from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create", verifyAdmin, upload.array("images"), productController.createProduct);
router.patch("/update/:productId", verifyAdmin, upload.array("images"), productController.updateProduct);
router.delete("/delete/:productId", verifyAdmin, productController.deleteProduct);

router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);

export default router;