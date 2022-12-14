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
exports.registerUser = void 0;
require("express-async-errors");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../model/userModel"));
// REGISTER A USER
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    //VALIDATION
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all required fields");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password should be at least 6 characters long");
    }
    // -Check if email already in use
    const userExist = yield userModel_1.default.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("Email has already been used");
    }
    // CREATE NEW USER
    const user = yield userModel_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        const { _id, name, admin } = user;
        res.status(201).json({
            _id,
            name,
            admin,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}));
