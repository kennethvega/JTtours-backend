import asyncHandler from "express-async-handler";
import EmailList from "../model/emailListModel";

// ADD EMAIL -------
export const addEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // validation
  if (!email) {
    res.status(400);
    throw new Error("Please fill in email");
  }

  // -Check if email already subscribed
  const emailExist = await EmailList.findOne({ email });
  if (emailExist) {
    res.status(400);
    throw new Error(
      "This email is already subscribed to the JTtours&travels news letter."
    );
  }
  // add the email input
  const emailList = await EmailList.create({ email });
  res.status(201).json(emailList);
});

// GET ALL EMAIL ------
export const getAllEmail = asyncHandler(async (req, res) => {
  // fetch all emails
  const emails = await EmailList.find().sort("-createdAt");
  res.status(200).json(emails);
});

// DELETE EMAIL--------
export const deleteEmail = asyncHandler(async (req: Request | any, res) => {
  const email = await EmailList.findById(req.params.id); //get product from url/params id
  if (!email) {
    res.status(404);
    throw new Error("email not found.");
  }
  await email.remove(); // delete from database
  res.status(200).json({ message: "Email deleted" });
});
