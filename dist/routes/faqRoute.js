"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faqController_1 = require("./../controller/faqController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authMiddleware_1 = require("../middleware/authMiddleware");
// booking routes
router.post("/", authMiddleware_1.protect, faqController_1.createFaq);
router.get("/", faqController_1.getAllFaq);
router.patch("/:id", authMiddleware_1.protect, faqController_1.updateFaq);
router.delete("/:id", authMiddleware_1.protect, faqController_1.deleteFaq);
exports.default = router;
