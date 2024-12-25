import request from 'supertest';
import app from '../app';

describe('Library Management System - Return Book', () => {
    it('should return a borrowed book', async () => {
        await request(app).post('/api/books').send({
            isbn: '978-3-16-148410-0',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            publicationYear: 1925,
        });
        await request(app).post('/api/borrow').send({ isbn: '978-3-16-148410-0' });

        const response = await request(app)
            .post('/api/return')
            .send({ isbn: '978-3-16-148410-0' });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: 'Book returned successfully',
        });
    });

    it('should not allow returning a book that was not borrowed', async () => {
        // Add a new book but don't borrow it
        await request(app).post('/api/books').send({
            isbn: '978-3-16-148410-0',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            publicationYear: 1925,
        });

        const response = await request(app)
            .post('/api/return')
            .send({ isbn: '978-3-16-148410-0' });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Book is not currently borrowed',
        });
    });

    it('should return an error when trying to return a non-existent book', async () => {
        const response = await request(app)
            .post('/api/return')
            .send({ isbn: '000-0-00-000000-0' });

        expect(response.status).toBe(404);
        expect(response.body).toMatchObject({
            error: 'Book not found',
        });
    });
});
