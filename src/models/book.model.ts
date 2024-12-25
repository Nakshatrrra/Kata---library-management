import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
    isbn: string;
    title: string;
    author: string;
    publicationYear: number;
    isBorrowed: boolean;
}

const BookSchema: Schema = new Schema({
    isbn: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    isBorrowed: { type: Boolean, default: false },
});

export default mongoose.model<IBook>('Book', BookSchema);
