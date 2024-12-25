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
exports.addBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isbn, title, author, publicationYear } = req.body;
    try {
        const existingBook = yield book_model_1.default.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({ error: 'Book with this ISBN already exists' });
        }
        const book = new book_model_1.default({ isbn, title, author, publicationYear });
        yield book.save();
        res.status(201).json({ message: 'Book added successfully', book });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.addBook = addBook;
