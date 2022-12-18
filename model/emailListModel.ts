import mongoose from "mongoose";

const emailListSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add your email"],
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ], // --> regex for email / checks valid email
    },
  },
  {
    timestamps: true,
  }
);

const EmailList = mongoose.model("EmailList", emailListSchema);
export default EmailList;
