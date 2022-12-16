"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    country: {
        type: String,
        required: [true, "Please add a country"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "Please add a city"],
        trim: true,
    },
    price: {
        type: String,
        required: [true, "Please add a price"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true,
    },
    image: {
        type: Object,
        default: {},
    },
    date: {
        type: String,
        required: [true, "Please add a tour date"],
        trim: true,
    },
}, {
    timestamps: true,
});
const Product = mongoose.model("Product", productSchema);
exports.default = Product;
