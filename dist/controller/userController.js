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
exports.updatePassword = exports.updateUser = exports.loginStatus = exports.getUser = exports.logout = exports.loginUser = exports.registerUser = void 0;
require("express-async-errors");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// GENERATE JWT TOKEN
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};
// REGISTER A USER ----------
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    //VALIDATION
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all required fields.");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password should be at least 6 characters long.");
    }
    // -Check if email already in use
    const userExist = yield userModel_1.default.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("Email has already been used.");
    }
    // CREATE NEW USER
    const user = yield userModel_1.default.create({
        name,
        email,
        password,
    });
    // generate token
    const token = generateToken(user._id);
    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
    });
    if (user) {
        const { _id, name, admin } = user;
        res.status(201).json({
            _id,
            name,
            admin,
            token,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data.");
    }
}));
// LOGIN USER ------------
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // validate request
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add both email and password.");
    }
    // check if user exist using email
    const user = yield userModel_1.default.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User not found, please try again or signup.");
    }
    // then check if password is correct then get a cookie
    const correctPassword = yield bcryptjs_1.default.compare(password, user.password);
    // generate token
    const token = generateToken(user._id);
    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
    });
    // send a respond
    if (user && correctPassword) {
        const { _id, name, admin } = user;
        res.status(200).json({
            _id,
            name,
            admin,
            token,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
}));
// LOGOUT USER ------------
exports.logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({ message: "Successfully Logged Out" });
}));
// GET USER DATA -------
exports.getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.user._id);
    if (user) {
        const { _id, name, email } = user;
        res.status(200).json({
            _id,
            name,
            email,
        });
    }
    else {
        res.status(400);
        throw new Error("User Not Found");
    }
}));
// GET LOGGED IN STATUS --------
exports.loginStatus = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false);
    }
    // Verify Token
    const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (verified) {
        return res.json(true);
    }
    return res.json(false);
}));
// UPDATE NAME---------
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.user._id); //access to req.user because of protected route/authMiddleware
    if (user) {
        const { name, email } = user;
        user.email = email;
        user.name = req.body.name || name;
        const updatedUser = yield user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
}));
// UPDATE PASSWORD -------
exports.updatePassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.user._id); //access to req.user because of protected route/authMiddleware
    const { oldPassword, newPassword } = req.body;
    // Validation
    if (!user) {
        res.status(400);
        throw new Error("User not found please login or signup");
    }
    if (!oldPassword || !newPassword) {
        res.status(400);
        throw new Error("Please add both old and new password");
    }
    // Check if old password matches the current password in the DB
    const passwordIsCorrect = yield bcryptjs_1.default.compare(oldPassword, user.password);
    // Save new password
    if (user && passwordIsCorrect) {
        user.password = newPassword;
        yield user.save(); //save changes
        res.status(200).send("Password change successfull");
    }
    else {
        res.status(400);
        throw new Error("Old password is incorrect");
    }
}));
