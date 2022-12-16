import "express-async-errors";
import asyncHandler from "express-async-handler";
import User from "../model/userModel";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { Express, Request, Response } from "express";
// GENERATE JWT TOKEN
const generateToken = (id: ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

// REGISTER A USER ------------
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //VALIDATION
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all required fields.");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password should be at least 6 characters long.");
  }
  // -Check if email already in use
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Email has already been used.");
  }

  // CREATE NEW USER
  const user = await User.create({
    name,
    email,
    password,
  });
  // generate token
  const token = generateToken(user._id);
  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });
  if (user) {
    const { _id, name, admin } = user;
    res.status(201).json({
      _id,
      name,
      admin,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

// LOGIN USER ------------
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add both email and password.");
  }
  // check if user exist using email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found, please try again or signup.");
  }

  // then check if password is correct then get a cookie
  const correctPassword = await bcrypt.compare(password, user.password);
  // generate token
  const token = generateToken(user._id);
  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });
  // send a respond
  if (user && correctPassword) {
    const { _id, name, admin } = user;
    res.status(200).json({
      _id,
      name,
      admin,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// LOGOUT USER ------------
export const logout = asyncHandler(
  async (req: Request, res: Response | any) => {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({ message: "Successfully Logged Out" });
  }
);

// GET USER DATA -------
export const getUser = asyncHandler(async (req: Request | any, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { _id, name, email } = user;
    res.status(200).json({
      _id,
      name,
      email,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// GET LOGGED IN STATUS --------
export const loginStatus = asyncHandler(
  async (req: Request, res: Response | any) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }
    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    if (verified) {
      return res.json(true);
    }
    return res.json(false);
  }
);

// UPDATE NAME---------
export const updateUser = asyncHandler(
  async (req: Request | any, res: Response) => {
    const user = await User.findById(req.user._id); //access to req.user because of protected route/authMiddleware
    if (user) {
      const { name, email } = user;
      user.email = email;
      user.name = req.body.name || name;

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

// UPDATE PASSWORD -------
export const updatePassword = asyncHandler(
  async (req: Request | any, res: Response) => {
    const user = await User.findById(req.user._id); //access to req.user because of protected route/authMiddleware
    const { oldPassword, newPassword } = req.body;
    // Validation
    if (!user) {
      res.status(400);
      throw new Error("User not found please login or signup");
    }
    if (!oldPassword || !newPassword) {
      res.status(400);
      throw new Error("Please add both old and new password");
    }
    // Check if old password matches the current password in the DB
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
    // Save new password
    if (user && passwordIsCorrect) {
      user.password = newPassword;
      await user.save(); //save changes
      res.status(200).send("Password change successfull");
    } else {
      res.status(400);
      throw new Error("Old password is incorrect");
    }
  }
);
