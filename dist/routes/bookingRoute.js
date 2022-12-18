"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingController_1 = require("./../controller/bookingController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authMiddleware_1 = require("../middleware/authMiddleware");
// booking routes
router.post("/", bookingController_1.createBooking);
router.get("/", bookingController_1.getAllBookings);
router.get("/:id", bookingController_1.getBooking);
router.patch("/:id", authMiddleware_1.protect, bookingController_1.updateBooking);
router.delete("/:id", authMiddleware_1.protect, bookingController_1.deleteBooking);
exports.default = router;
