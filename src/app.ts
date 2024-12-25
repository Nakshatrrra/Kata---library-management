import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from './routes/book.routes';

const app = express();
app.use(express.json());

app.use('/api', bookRoutes);

mongoose
    .connect('mongodb+srv://naksh:naksh@cluster0.tcatx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

export default app;
