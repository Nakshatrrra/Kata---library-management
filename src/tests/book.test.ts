import request from 'supertest';
import app from '../app';

describe('Library Management System - Add Books', () => {
    it('should add a new book to the library', async () => {
        const response = await request(app)
            .post('/books')
            .send({
                isbn: '12345',
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                publicationYear: 1925,
            });
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            message: 'Book added successfully',
        });
    });

    it('should not allow adding a book with a duplicate ISBN', async () => {
        await request(app).post('/books').send({
            isbn: '12345',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            publicationYear: 1925,
        });

        const response = await request(app).post('/books').send({
            isbn: '12345',
            title: 'Another Book',
            author: 'Another Author',
            publicationYear: 2023,
        });

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            error: 'Book with this ISBN already exists',
        });
    });
});
