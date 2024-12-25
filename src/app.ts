import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookRoutes from './routes/book.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', bookRoutes);

const mongoURI = process.env.MONGODB_URI;

if (mongoURI) {
    mongoose
        .connect(mongoURI)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.error('MongoDB connection error:', err));
} else {
    console.error('MongoDB URI is missing');
}
export default app;
