import { fileSizeFormatter } from "./../utils/fileUpload";
import cloudinary from "../utils/cloudinary";
import asyncHandler from "express-async-handler";
import Testimonial from "../model/testimonialModel";
import { Request, Response } from "express";
import { unlinkFile } from "../utils/unlink";

// CREATE A TESTIMONIAL ----------
export const createTestimonial = asyncHandler(
  async (req: Request | any, res) => {
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
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "JTtours App",
          resource_type: "image",
        });
        // after uploading successfully delete photo in upload file
        await unlinkFile(req.file.path);
      } catch (error) {
        res.status(500);
        await unlinkFile(req.file.path);
        throw new Error("Image could not be uploaded");
      }
      fileData = {
        public_id: uploadedFile.public_id, //refer to public_id when deleting image in cloudinary
        fileName: req.file.originalname,
        imageURL: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
    // create product
    const testimonial = await Testimonial.create({
      name,
      message,
      image: fileData,
    });
    res.status(201).json(testimonial);
  }
);

// GET ALL TESTIMONIALS --------
export const getAllTestimonial = asyncHandler(
  async (req: Request | any, res) => {
    // fetch testimonials
    const testimonial = await Testimonial.find().sort("-createdAt");
    res.status(200).json(testimonial);
  }
);

// UPDATE TESTIMONIAL ----------
export const updateTestimonial = asyncHandler(
  async (req: Request | any, res) => {
    const { name, message } = req.body;
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
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
          await cloudinary.uploader.destroy(testimonial.image.public_id);
          //then upload new image
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
          public_id: uploadedFile.public_id, //refer to public_id when deleting image in cloudinary
          fileName: req.file.originalname,
          imageURL: uploadedFile.secure_url,
          fileType: req.file.mimetype,
          fileSize: fileSizeFormatter(req.file.size, 2),
        };
      }
    }
    // update product
    const updatedProduct = await Testimonial.findByIdAndUpdate(
      { _id: id },
      {
        name,
        message,
        image:
          Object.keys(fileData).length === 0 ? testimonial.image : fileData,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedProduct);
  }
);

// GET SINGLE TESTIMONIAL -------
export const getTestimonial = asyncHandler(async (req: Request | any, res) => {
  const testimonial = await Testimonial.findById(req.params.id); //get product from url/params id
  // validation
  if (!testimonial) {
    res.status(404);
    throw new Error("Product not found.");
  }
  res.status(200).json(testimonial);
});

// DELETE TESTIMONIAL --------
export const deleteTestimonial = asyncHandler(
  async (req: Request | any, res) => {
    const testimonial = await Testimonial.findById(req.params.id); //get product from url/params id
    if (!testimonial) {
      res.status(404);
      throw new Error("Testimonial not found.");
    }
    await cloudinary.uploader.destroy(testimonial.image.public_id); // delete from cloudinary
    await testimonial.remove(); // delete from database
    res.status(200).json({ message: "Testimonial deleted" });
  }
);
