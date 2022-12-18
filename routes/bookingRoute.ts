import {
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
} from "./../controller/bookingController";

import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware";

// booking routes
router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBooking);
router.patch("/:id", protect, updateBooking);
export default router;
