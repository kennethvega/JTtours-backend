import express from "express";
const router = express.Router();
import { createProduct } from "./../controller/productController";
import { protect } from "../middleware/authMiddleware";

// PRODUCT ROUTES
router.post("/", protect, createProduct);
export default router;
