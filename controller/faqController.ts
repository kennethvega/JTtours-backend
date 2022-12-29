import asyncHandler from "express-async-handler";
import Faq from "../model/faqModel";

// CREATE A FAQ -------
export const createFaq = asyncHandler(async (req: Request | any, res) => {
  const { question, answer } = req.body;
  // validation
  if (!question || !answer) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  // create a question and answer
  const faq = await Faq.create({ question, answer });
  res.status(201).json(faq);
});
// GET ALL FAQ'S -------
export const getAllFaq = asyncHandler(async (req, res) => {
  // fetch all emails
  const faq = await Faq.find().sort("-createdAt");
  res.status(200).json(faq);
});
// UPDATE FAQ'S -------
export const updateFaq = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;
  const { id } = req.params;
  const faq = await Faq.findById(id);

  if (!faq) {
    res.status(404);
    throw new Error("FAQ not found.");
  }
  if (!question || !answer) {
    res.status(400);
    throw new Error("Please fill in all fields.");
  }
  // update FAQ
  console.log(question);
  const updatedFaq = await Faq.findByIdAndUpdate(
    { _id: id },
    {
      question,
      answer,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedFaq);
});

// DELETE A FAQ ---------
export const deleteFaq = asyncHandler(async (req: Request | any, res) => {
  const faq = await Faq.findById(req.params.id); //get faq from url/params id
  if (!faq) {
    res.status(404);
    throw new Error("Faq not found.");
  }
  await faq.remove(); // delete from database
  res.status(200).json({ message: "Faq deleted" });
});

// GET SINGLE FAQ -------
export const getFaq = asyncHandler(async (req: Request | any, res) => {
  const faq = await Faq.findById(req.params.id);
  // validation
  if (!faq) {
    res.status(404);
    throw new Error("FAQ not found.");
  }
  res.status(200).json(faq);
});
