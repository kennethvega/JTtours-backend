"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFaq = exports.deleteFaq = exports.updateFaq = exports.getAllFaq = exports.createFaq = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const faqModel_1 = __importDefault(require("../model/faqModel"));
// CREATE A FAQ -------
exports.createFaq = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, answer } = req.body;
    // validation
    if (!question || !answer) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    // create a question and answer
    const faq = yield faqModel_1.default.create({ question, answer });
    res.status(201).json(faq);
}));
// GET ALL FAQ'S -------
exports.getAllFaq = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch all emails
    const faq = yield faqModel_1.default.find().sort("-createdAt");
    res.status(200).json(faq);
}));
// UPDATE FAQ'S -------
exports.updateFaq = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, answer } = req.body;
    const { id } = req.params;
    const faq = yield faqModel_1.default.findById(id);
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
    const updatedFaq = yield faqModel_1.default.findByIdAndUpdate({ _id: id }, {
        question,
        answer,
    }, {
        new: true,
        runValidators: true,
    });
    res.status(200).json(updatedFaq);
}));
// DELETE A FAQ ---------
exports.deleteFaq = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const faq = yield faqModel_1.default.findById(req.params.id); //get faq from url/params id
    if (!faq) {
        res.status(404);
        throw new Error("Faq not found.");
    }
    yield faq.remove(); // delete from database
    res.status(200).json({ message: "Faq deleted" });
}));
// GET SINGLE FAQ -------
exports.getFaq = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const faq = yield faqModel_1.default.findById(req.params.id);
    // validation
    if (!faq) {
        res.status(404);
        throw new Error("FAQ not found.");
    }
    res.status(200).json(faq);
}));
