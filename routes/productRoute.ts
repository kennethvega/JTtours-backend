import express from "express";
const router = express.Router();
import {
  createProduct,
  getAllProducts,
} from "./../controller/productController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../utils/fileUpload";
// PRODUCT ROUTES
router.post("/", protect, upload.single("image"), createProduct);
router.get("/", getAllProducts);
export default router;
