import mongoose from "mongoose";

// FREQUENTLY ASKED QUESTION
const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Please add a question"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Please add your an answer"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Faq = mongoose.model("Faq", faqSchema);
export default Faq;
