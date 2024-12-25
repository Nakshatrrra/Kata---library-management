import express from 'express';
const { addBook } = require('../controllers/book.controller');

const router = express.Router();

router.post('/books', addBook);

export default router;
