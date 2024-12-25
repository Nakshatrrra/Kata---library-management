"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(book_routes_1.default);
mongoose_1.default
    .connect('mongodb+srv://naksh:naksh@cluster0.tcatx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
exports.default = app;
