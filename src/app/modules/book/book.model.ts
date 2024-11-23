import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: String,
        default: () => new Date().toISOString(),
    },
    updatedAt: {
        type: String,
        default: () => new Date().toISOString(),
    },
});

export const BookModel = model<IBook>('Books',bookSchema);