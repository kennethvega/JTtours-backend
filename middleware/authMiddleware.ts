import asyncHandler from "express-async-handler";
import User from "../model/userModel";
import jwt from "jsonwebtoken";
import { Request } from "express";
interface JwtPayload {
  id: string;
}
// Checks if there is a token, if not protect routes
export const protect = asyncHandler(async (req: Request | any, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorize, please login");
    }
    // 1. Verify Token to get id
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    // 2. Get user details using id from token
    const user = await User.findById(verified.id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorize, please login");
  }
});
