import express from "express";
const router = express.Router();
import { createProduct } from "./../controller/productController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../utils/fileUpload";
// PRODUCT ROUTES
router.post("/", protect, upload.single("image"), createProduct);
export default router;
