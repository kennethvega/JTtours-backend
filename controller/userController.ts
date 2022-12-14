import { Request, Response } from "express";
import "express-async-errors";
import asyncHandler from "express-async-handler";
import User from "../model/userModel";
// REGISTER A USER
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    //VALIDATION
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill all required fields");
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password should be at least 6 characters long");
    }
    // -Check if email already in use
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("Email has already been used");
    }
    // CREATE NEW USER
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      const { _id, name, admin } = user;
      res.status(201).json({
        _id,
        name,
        admin, 
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);
