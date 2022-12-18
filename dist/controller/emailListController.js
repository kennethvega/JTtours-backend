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
exports.deleteEmail = exports.getAllEmail = exports.addEmail = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const emailListModel_1 = __importDefault(require("../model/emailListModel"));
// ADD EMAIL -------
exports.addEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    // validation
    if (!email) {
        res.status(400);
        throw new Error("Please fill in email");
    }
    // -Check if email already subscribed
    const emailExist = yield emailListModel_1.default.findOne({ email });
    if (emailExist) {
        res.status(400);
        throw new Error("This email is already subscribed to the JTtours&travels news letter.");
    }
    // add the email input
    const emailList = yield emailListModel_1.default.create({ email });
    res.status(201).json(emailList);
}));
// GET ALL EMAIL ------
exports.getAllEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch all emails
    const emails = yield emailListModel_1.default.find().sort("-createdAt");
    res.status(200).json(emails);
}));
// DELETE EMAIL--------
exports.deleteEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = yield emailListModel_1.default.findById(req.params.id); //get product from url/params id
    if (!email) {
        res.status(404);
        throw new Error("email not found.");
    }
    yield email.remove(); // delete from database
    res.status(200).json({ message: "Email deleted" });
}));
