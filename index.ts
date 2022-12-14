import * as dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import errorHandler from "./middleware/errorMiddleware";
import userRoute from "./routes/userRoute";

// CONFIGURATIONS & MIDDLEWARE
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //--> helps handle data via URL
app.use(bodyParser.json()); //-->converts/parse data to object
app.use("/api/users", userRoute); // routes middleware
app.use(errorHandler); // custom error middleware

// ROUTES
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
