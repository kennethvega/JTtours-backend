"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const productController_1 = require("./../controller/productController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const fileUpload_1 = require("../utils/fileUpload");
// PRODUCT ROUTES
router.post("/", authMiddleware_1.protect, fileUpload_1.upload.single("image"), productController_1.createProduct);
router.get("/", productController_1.getAllProducts);
router.get("/:id", productController_1.getProducts);
router.delete("/:id", authMiddleware_1.protect, productController_1.deleteProduct);
exports.default = router;
