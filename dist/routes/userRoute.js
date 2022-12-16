"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController"); //controller function
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// User routes
router.post("/register", userController_1.registerUser);
router.post("/login", userController_1.loginUser);
router.get("/logout", userController_1.logout);
router.get("/getuser", authMiddleware_1.protect, userController_1.getUser);
router.get("/loggedin", userController_1.loginStatus);
router.patch("/updateuser", authMiddleware_1.protect, userController_1.updateUser);
router.patch("/updatepassword", authMiddleware_1.protect, userController_1.updatePassword);
exports.default = router;
