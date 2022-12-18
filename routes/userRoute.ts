import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  updatePassword,
} from "../controller/userController"; //controller function
import { protect } from "../middleware/authMiddleware";

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/updatepassword", protect, updatePassword);

export default router;
