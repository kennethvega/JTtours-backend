import express from "express";
const router = express.Router();
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProducts,
  updateProduct,
} from "./../controller/productController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../utils/fileUpload";
// PRODUCT ROUTES
router.post("/", protect, upload.single("image"), createProduct);
router.patch("/:id", protect, upload.single("image"), updateProduct);
router.get("/", getAllProducts);
router.get("/:id", getProducts);
router.delete("/:id", protect, deleteProduct);

export default router;
