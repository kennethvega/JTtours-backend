require("dotenv").config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import errorHandler from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import path from "path";
// CONFIGURATIONS & MIDDLEWARE

const app = express();
app.use(express.json());
app.use(cookieParser()); // helps send http-only cookie
app.use(express.urlencoded({ extended: false })); //--> helps handle data via URL
app.use(bodyParser.json()); //-->converts/parse data to object
app.use(errorHandler); // custom error middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // fill upload util is going to point in uploads folder

// ROUTES MIDDLEWARE
app.use("/api/users", userRoute); // user routes
app.use("/api/products", productRoute); // product routes
app.get("/", (req: Request, res: Response) => {
  res.send("Home Page");
});

// CONNECT TO DB AND START SERVER
mongoose.set("strictQuery", true);
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI as string;

mongoose
  .connect(MONGO)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err: string) => console.log(err));
