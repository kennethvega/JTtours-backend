import { fileSizeFormatter } from "./../utils/fileUpload";
import cloudinary from "../utils/cloudinary";
import asyncHandler from "express-async-handler";
import Product from "../model/productModel";
import { Request, Response } from "express";
import { unlinkFile } from "../utils/unlink";

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
      // after uploading sucessfully delete photo in upload file
      await unlinkFile(req.file.path);
    } catch (error) {
      res.status(500);
      await unlinkFile(req.file.path);
      throw new Error("Image could not be uploaded");
    }
    fileData = {
      public_id: uploadedFile.public_id,
      fileName: req.file.originalname,
      imageURL: uploadedFile.secure_url,
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

// GET ALL PRODUCTS ---------
export const getAllProducts = asyncHandler(async (req: Request | any, res) => {
  // fetch products
  const products = await Product.find().sort("-createdAt");
  res.status(200).json(products);
});

// GET SINGLE PRODUCT -------
export const getProducts = asyncHandler(async (req: Request | any, res) => {
  const product = await Product.findById(req.params.id); //get product from url/params id
  // validation
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }
  res.status(200).json(product);
});

// DELETE PRODUCT --------
export const deleteProduct = asyncHandler(async (req: Request | any, res) => {
  const product = await Product.findById(req.params.id); //get product from url/params id
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }
  await cloudinary.uploader.destroy(product.image.public_id); // delete from cloudinary
  await product.remove(); // delete from database
  res.status(200).json({ message: "Product deleted" });
});
