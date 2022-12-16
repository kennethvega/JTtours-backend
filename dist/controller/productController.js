"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const fileUpload_1 = require("./../utils/fileUpload");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productModel_1 = __importDefault(require("../model/productModel"));
// CREATE PRODUCT ---------
exports.createProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city, country, description, price, date } = req.body;
    // validation
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorize, please login");
    }
    if (!city || !country || !description || !price || !date) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    // Handle Image upload
    let fileData = {};
    if (req.file) {
        // Save image to cloudinary
        let uploadedFile;
        try {
            uploadedFile = yield cloudinary_1.default.uploader.upload(req.file.path, {
                folder: "JTtours App",
                resource_type: "image",
            });
        }
        catch (error) {
            res.status(500);
            throw new Error("Image could not be uploaded");
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: (0, fileUpload_1.fileSizeFormatter)(req.file.size, 2),
        };
    }
    // create product
    const product = yield productModel_1.default.create({
        city,
        country,
        description,
        price,
        date,
        image: fileData,
    });
    res.status(201).json(product);
}));
