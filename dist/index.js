"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const bookingRoute_1 = __importDefault(require("./routes/bookingRoute"));
const emailListRoute_1 = __importDefault(require("./routes/emailListRoute"));
const path_1 = __importDefault(require("path"));
// CONFIGURATIONS & MIDDLEWARE
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)()); // helps send http-only cookie
app.use(express_1.default.urlencoded({ extended: false })); //--> helps handle data via URL
app.use(body_parser_1.default.json()); //-->converts/parse data to object
app.use(errorMiddleware_1.default); // custom error middleware
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads"))); // fill upload util is going to point in uploads folder
// ROUTES MIDDLEWARE
app.use("/api/users", userRoute_1.default); // user routes.
app.use("/api/products", productRoute_1.default); // product routes
app.use("/api/booking", bookingRoute_1.default); // booking routes
app.use("/api/email", emailListRoute_1.default); // emailList routes
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
