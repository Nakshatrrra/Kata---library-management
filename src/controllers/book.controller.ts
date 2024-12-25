import { Request, Response } from 'express';
import Book from '../models/book.model';

export const addBook = async (req: Request, res: Response) => {
    const { isbn, title, author, publicationYear } = req.body;

    try {
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({ error: 'Book with this ISBN already exists' });
        }

        const book = new Book({ isbn, title, author, publicationYear });
        await book.save();

        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
