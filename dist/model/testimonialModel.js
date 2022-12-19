"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const testimonialSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a customer name"],
        trim: true,
    },
    message: {
        type: String,
        required: [true, "Please add a customer message"],
        trim: true,
    },
    image: {
        type: Object,
        default: {},
    },
}, {
    timestamps: true,
});
const Testimonial = mongoose.model("Testimonial", testimonialSchema);
exports.default = Testimonial;
