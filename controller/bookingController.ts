import asyncHandler from "express-async-handler";
import Booking from "../model/bookingModel";

// CREATE A BOOKING -------
export const createBooking = asyncHandler(async (req: Request | any, res) => {
  const {
    packageName,
    customerName,
    contact,
    email,
    customerCount,
    tourDate,
    numberOfRooms,
    hotel,
    note,
  } = req.body;
  // validation
  if (
    !packageName ||
    !customerName ||
    !contact ||
    !email ||
    !customerCount ||
    !tourDate
  ) {
    res.status(400);
    throw new Error("Please fill in all required input");
  }
  // create booking
  const booking = await Booking.create({
    packageName,
    customerName,
    contact,
    email,
    customerCount,
    tourDate,
    numberOfRooms,
    hotel,
    note,
  });
  res.status(201).json(booking);
});

// GET ALL BOOKINGS ----
export const getAllBookings = asyncHandler(async (req: Request | any, res) => {
  // fetch products
  const booking = await Booking.find().sort("-createdAt");
  res.status(200).json(booking);
});

// GET SINGLE BOOKING -------
export const getBooking = asyncHandler(async (req: Request | any, res) => {
  const booking = await Booking.findById(req.params.id); //get product from url/params id
  // validation
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found.");
  }
  res.status(200).json(booking);
});

// UPDATE BOOKING STATUS ---------
export const updateBooking = asyncHandler(async (req: Request | any, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const booking = await Booking.findById(id);
  // validation
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found.");
  }
  // update product
  const updateStatus = await Booking.findByIdAndUpdate(
    { _id: id },
    {
      status,
    },
    {
      new: true,
    }
  );
  res.status(200).json(updateStatus);
});
