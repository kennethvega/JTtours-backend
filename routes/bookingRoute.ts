import {
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} from "./../controller/bookingController";

import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware";

// booking routes
router.post("/", createBooking);
router.get("/:id", protect, getBooking);
router.get("/", protect, getAllBookings);
router.patch("/:id", protect, updateBooking);
router.delete("/:id", protect, deleteBooking);
export default router;
