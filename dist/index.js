"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
// CONFIGURATIONS & MIDDLEWARE
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false })); //--> helps handle data via URL
app.use(body_parser_1.default.json()); //-->converts/parse data to object
app.use("/api/users", userRoute_1.default); // routes middleware
app.use(errorMiddleware_1.default); // custom error middleware
// ROUTES
app.get("/", (req, res) => {
    res.send("Home Page");
});
// CONNECT TO DB AND START SERVER
mongoose_1.default.set("strictQuery", true);
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI;
mongoose_1.default
    .connect(MONGO)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`);
    });
})
    .catch((err) => console.log(err));
