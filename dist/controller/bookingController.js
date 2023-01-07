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
exports.deleteBooking = exports.updateBooking = exports.getBooking = exports.getAllBookings = exports.createBooking = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bookingModel_1 = __importDefault(require("../model/bookingModel"));
// CREATE A BOOKING -------
exports.createBooking = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { packageName, customerName, contact, email, adultCount, childCount, tourDate, numberOfRooms, hotel, note, } = req.body;
    // validation
    if (!customerName ||
        !tourDate ||
        !contact ||
        !email ||
        !adultCount ||
        !note) {
        res.status(400);
        throw new Error("Please fill in all required input");
    }
    // create booking
    const booking = yield bookingModel_1.default.create({
        packageName,
        customerName,
        contact,
        email,
        adultCount,
        childCount,
        tourDate,
        numberOfRooms,
        hotel,
        note,
    });
    res.status(201).json(booking);
}));
// GET ALL BOOKINGS ----
exports.getAllBookings = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch products
    const booking = yield bookingModel_1.default.find().sort("-createdAt");
    res.status(200).json(booking);
}));
// GET SINGLE BOOKING -------
exports.getBooking = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield bookingModel_1.default.findById(req.params.id); //get product from url/params id
    // validation
    if (!booking) {
        res.status(404);
        throw new Error("Booking not found.");
    }
    res.status(200).json(booking);
}));
// UPDATE BOOKING STATUS ---------
exports.updateBooking = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.body;
    const { id } = req.params;
    const booking = yield bookingModel_1.default.findById(id);
    // validation
    if (!booking) {
        res.status(404);
        throw new Error("Booking not found.");
    }
    // update booking status
    const updateStatus = yield bookingModel_1.default.findByIdAndUpdate({ _id: id }, {
        status,
    }, {
        new: true,
    });
    res.status(200).json(updateStatus);
}));
// DELETE BOOKING --------------
exports.deleteBooking = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield bookingModel_1.default.findById(req.params.id); //get product from url/params id
    if (!booking) {
        res.status(404);
        throw new Error("Booking not found.");
    }
    yield booking.remove(); // delete from database
    res.status(200).json({ message: "Booking deleted" });
}));
