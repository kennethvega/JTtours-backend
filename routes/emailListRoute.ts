import {
  addEmail,
  deleteEmail,
  getAllEmail,
} from "./../controller/emailListController";
import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware";

router.post("/", addEmail);
router.get("/", protect, getAllEmail);
router.delete("/:id", protect, deleteEmail);
export default router;
