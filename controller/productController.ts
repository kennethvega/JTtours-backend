import asyncHandler from "express-async-handler";
import Product from "../model/productModel";
import { Request, Response } from "express";
// CREATE PRODUCT ---------
export const createProduct = asyncHandler(async (req: Request | any, res) => {
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
  // manage image upload using multer

  // create product
  const product = await Product.create({
    city,
    country,
    description,
    price,
    date,
  });
  res.status(201).json(product);
});
