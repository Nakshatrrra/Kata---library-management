import request from 'supertest';
import app from '../app';

describe('Library Management System - Borrow Book', () => {
    it('should borrow a book if available', async () => {
        // Add a new book first
        await request(app).post('/api/books').send({
            isbn: '978-3-16-148410-8',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            publicationYear: 1925,
        });

        const response = await request(app)
            .post('/api/borrow')
            .send({ isbn: '978-3-16-148410-8' });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: 'Book borrowed successfully',
        });
    });

    it('should not allow borrowing a book that is already borrowed', async () => {
        // Add and borrow the book
        await request(app).post('/api/books').send({
            isbn: '978-3-16-148410-5',
            title: 'The Great Gatsby 5',
            author: 'F. Scott Fitzgerald',
            publicationYear: 1925,
        });
        await request(app).post('/api/borrow').send({ isbn: '978-3-16-148410-5' });

        // Try borrowing the same book again
        const response = await request(app)
            .post('/api/borrow')
            .send({ isbn: '978-3-16-148410-5' });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Book is already borrowed',
        });
    });

    it('should return an error when trying to borrow a non-existent book', async () => {
        const response = await request(app)
            .post('/api/borrow')
            .send({ isbn: '000-0-00-000000-0' });

        expect(response.status).toBe(404);
        expect(response.body).toMatchObject({
            error: 'Book not found',
        });
    });
});
