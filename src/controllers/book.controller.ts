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

export const borrowBook = async (req: Request, res: Response) => {
    const { isbn } = req.body;
  
    try {
      const book = await Book.findOne({ isbn });
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      if (book.isBorrowed) {
        return res.status(400).json({ error: 'Book is already borrowed' });
      }
  
      book.isBorrowed = true;
      await book.save();
  
      res.status(200).json({
        message: 'Book borrowed successfully',
        book,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to borrow book' });
    }
  };
  

  export const returnBook = async (req: Request, res: Response) => {
    const { isbn } = req.body;
  
    try {
      const book = await Book.findOne({ isbn });
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      if (!book.isBorrowed) {
        return res.status(400).json({ error: 'Book is not currently borrowed' });
      }
  
      book.isBorrowed = false;
      await book.save();
  
      res.status(200).json({
        message: 'Book returned successfully',
        book,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to return book' });
    }
  };
  

  export const viewAvailableBooks = async (req: Request, res: Response) => {
    try {
      const availableBooks = await Book.find({ isBorrowed: false });
  
      res.status(200).json({
        message: 'Available books retrieved successfully',
        books: availableBooks,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve available books' });
    }
  };
  