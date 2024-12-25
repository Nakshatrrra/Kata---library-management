import express from 'express';
const { addBook , borrowBook, returnBook, viewAvailableBooks} = require('../controllers/book.controller');

const router = express.Router();

// Route to add a new book
router.post('/books', addBook);

// Route to borrow a book
router.post('/borrow', borrowBook);

// Route to return a book
router.post('/return', returnBook);

// Route to view all available books
router.get('/available', viewAvailableBooks);

export default router;
