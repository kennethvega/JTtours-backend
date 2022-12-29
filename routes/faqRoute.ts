import {
  getAllFaq,
  createFaq,
  updateFaq,
  deleteFaq,
  getFaq,
} from "./../controller/faqController";
import express from "express";

const router = express.Router();
import { protect } from "../middleware/authMiddleware";

// booking routes
router.post("/", protect, createFaq);
router.get("/", getAllFaq);
router.patch("/:id", protect, updateFaq);
router.get('/:id', protect, getFaq);
router.delete("/:id", protect, deleteFaq);
export default router;
