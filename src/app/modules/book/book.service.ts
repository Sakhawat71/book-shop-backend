import { IBook } from "./book.interface";
import { BookModel } from "./book.model"

// Get All Books 
const getBooksFromDb = async () => {
    const result = await BookModel.find();
    return result;
}

// Create a Book
const createBookInDb = async (bookData: IBook) => {
    const result = await BookModel.create(bookData);
    return result;
}

export const bookServices = {
    getBooksFromDb,
    createBookInDb,
}