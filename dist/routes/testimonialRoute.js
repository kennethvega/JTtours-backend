"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testimonialController_1 = require("./../controller/testimonialController");
const authMiddleware_1 = require("./../middleware/authMiddleware");
const express_1 = __importDefault(require("express"));
const fileUpload_1 = require("../utils/fileUpload");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.protect, fileUpload_1.upload.single("image"), testimonialController_1.createTestimonial);
router.patch("/:id", authMiddleware_1.protect, fileUpload_1.upload.single("image"), testimonialController_1.updateTestimonial);
router.get("/", testimonialController_1.getAllTestimonial);
router.get("/:id", authMiddleware_1.protect, testimonialController_1.getTestimonial);
router.delete("/:id", authMiddleware_1.protect, testimonialController_1.deleteTestimonial);
exports.default = router;
