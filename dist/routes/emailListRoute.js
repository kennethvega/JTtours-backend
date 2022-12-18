"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailListController_1 = require("./../controller/emailListController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authMiddleware_1 = require("../middleware/authMiddleware");
router.post("/", emailListController_1.addEmail);
router.get("/", authMiddleware_1.protect, emailListController_1.getAllEmail);
router.delete("/:id", authMiddleware_1.protect, emailListController_1.deleteEmail);
exports.default = router;
