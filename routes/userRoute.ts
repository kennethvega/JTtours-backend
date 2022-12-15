import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  getUser,
} from "../controller/userController"; //controller function
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", getUser);

export default router;
