import { fileSizeFormatter } from "./../utils/fileUpload";
import cloudinary from "../utils/cloudinary";
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
  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "JTtours App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }
  // create product
  const product = await Product.create({
    city,
    country,
    description,
    price,
    date,
    image: fileData,
  });
  res.status(201).json(product);
});
