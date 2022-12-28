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
exports.deleteTestimonial = exports.getTestimonial = exports.updateTestimonial = exports.getAllTestimonial = exports.createTestimonial = void 0;
const fileUpload_1 = require("./../utils/fileUpload");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const testimonialModel_1 = __importDefault(require("../model/testimonialModel"));
const unlink_1 = require("../utils/unlink");
// CREATE A TESTIMONIAL ----------
exports.createTestimonial = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, message } = req.body;
    // validation
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorize, please login");
    }
    if (!name || !message) {
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
            // after uploading successfully delete photo in upload file
            yield (0, unlink_1.unlinkFile)(req.file.path);
        }
        catch (error) {
            res.status(500);
            yield (0, unlink_1.unlinkFile)(req.file.path);
            throw new Error("Image could not be uploaded");
        }
        fileData = {
            public_id: uploadedFile.public_id,
            fileName: req.file.originalname,
            imageURL: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: (0, fileUpload_1.fileSizeFormatter)(req.file.size, 2),
        };
    }
    // create product
    const testimonial = yield testimonialModel_1.default.create({
        name,
        message,
        image: fileData,
    });
    res.status(201).json(testimonial);
}));
// GET ALL TESTIMONIALS --------
exports.getAllTestimonial = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch testimonials
    const testimonial = yield testimonialModel_1.default.find().sort("-createdAt");
    res.status(200).json(testimonial);
}));
// UPDATE TESTIMONIAL ----------
exports.updateTestimonial = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, message } = req.body;
    const { id } = req.params;
    const testimonial = yield testimonialModel_1.default.findById(id);
    // validation
    if (!testimonial) {
        res.status(404);
        throw new Error("Testimonial not found.");
    }
    // Handle Image upload
    let fileData = {};
    if (req.file) {
        if (req.file.originalname !== testimonial.image.fileName) {
            // Save image to cloudinary
            let uploadedFile;
            try {
                // delete old image in cloudinary
                yield cloudinary_1.default.uploader.destroy(testimonial.image.public_id);
                //then upload new image
                uploadedFile = yield cloudinary_1.default.uploader.upload(req.file.path, {
                    folder: "JTtours App",
                    resource_type: "image",
                });
                // after uploading sucessfully delete photo in upload file
                yield (0, unlink_1.unlinkFile)(req.file.path);
            }
            catch (error) {
                res.status(500);
                yield (0, unlink_1.unlinkFile)(req.file.path);
                throw new Error("Image could not be uploaded");
            }
            fileData = {
                public_id: uploadedFile.public_id,
                fileName: req.file.originalname,
                imageURL: uploadedFile.secure_url,
                fileType: req.file.mimetype,
                fileSize: (0, fileUpload_1.fileSizeFormatter)(req.file.size, 2),
            };
        }
    }
    // update product
    const updatedProduct = yield testimonialModel_1.default.findByIdAndUpdate({ _id: id }, {
        name,
        message,
        image: Object.keys(fileData).length === 0 ? testimonial.image : fileData,
    }, {
        new: true,
        runValidators: true,
    });
    res.status(200).json(updatedProduct);
}));
// GET SINGLE TESTIMONIAL -------
exports.getTestimonial = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const testimonial = yield testimonialModel_1.default.findById(req.params.id); //get product from url/params id
    // validation
    if (!testimonial) {
        res.status(404);
        throw new Error("Product not found.");
    }
    res.status(200).json(testimonial);
}));
// DELETE TESTIMONIAL --------
exports.deleteTestimonial = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const testimonial = yield testimonialModel_1.default.findById(req.params.id); //get product from url/params id
    if (!testimonial) {
        res.status(404);
        throw new Error("Testimonial not found.");
    }
    yield cloudinary_1.default.uploader.destroy(testimonial.image.public_id); // delete from cloudinary
    yield testimonial.remove(); // delete from database
    res.status(200).json({ message: "Testimonial deleted" });
}));
