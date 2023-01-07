"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    packageName: {
        type: String,
        required: [true, "Please add a package name"],
    },
    customerName: {
        type: String,
        required: [true, "Please add your name"],
    },
    contact: {
        type: String,
        required: [true, "Please add your number"],
    },
    email: {
        type: String,
        required: [true, "Please add your email"],
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
        ], // --> regex for email / checks valid email
    },
    status: {
        type: Boolean,
        default: false,
        required: false,
    },
    adultCount: {
        type: String,
        required: [true, "Please add number of person"],
    },
    childCount: {
        type: String,
        default: "",
        required: false,
    },
    numberOfRooms: {
        type: String,
        required: false,
        default: "",
    },
    hotel: {
        type: String,
        required: false,
        default: "",
    },
    tourDate: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: false,
        default: "",
    },
}, {
    timestamps: true,
});
const Booking = mongoose_1.default.model("Booking", bookingSchema);
exports.default = Booking;
