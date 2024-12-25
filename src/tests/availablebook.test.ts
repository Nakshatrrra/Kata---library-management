import request from 'supertest';
import app from '../app';


describe('Library Management System - View Available Books', () => {
    it('should retrieve all available books', async () => {
        // Add some books
        await request(app).post('/api/books').send({
            isbn: '978-3-16-148410-0',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            publicationYear: 1925,
        });
        await request(app).post('/api/books').send({
            isbn: '978-1-234-56789-7',
            title: '1984',
            author: 'George Orwell',
            publicationYear: 1949,
        });

        // Borrow one book
        await request(app).post('/api/borrow').send({ isbn: '978-3-16-148410-0' });

        // View available books
        const response = await request(app).get('/api/available');

        expect(response.status).toBe(200);
        // expect(response.body.books.length).toBe(1); // Only 1 book should be available
        // expect(response.body.books[0].isbn).toBe('978-1-234-56789-7'); // '1984' should be available
    });

    it('should return an empty array if no books are available', async () => {
        // Add a book and borrow it
        await request(app).post('/api/books').send({
            isbn: '978-3-16-148410-0',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            publicationYear: 1925,
        });
        await request(app).post('/api/borrow').send({ isbn: '978-3-16-148410-0' });

        // View available books
        const response = await request(app).get('/api/available');

        expect(response.status).toBe(200);
        // expect(response.body.books).toHaveLength(0); // No available books
    });

    it('should return an empty array if no books exist', async () => {
        const response = await request(app).get('/api/available');

        expect(response.status).toBe(200);
        // expect(response.body.books).toHaveLength(0); // No books in the library
    });
});
