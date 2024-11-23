import { IBook } from "./book.interface";
import { BookModel } from "./book.model"


// Create a Book
const createBookInDb = async (bookData: IBook) => {
    const result = await BookModel.create(bookData);
    return result;
}

// Get All Books 
const getBooksFromDb = async () => {
    const result = await BookModel.find();
    return result;
}

// get Specific book
const getSpecificBookFromDb = async (productId: string) => {
    const result = await BookModel.findById(productId);
    return result;
}

// Update a Book
export const updateBookInDb = async (productId: string, updateData: IBook) => {
    const result = await BookModel.findByIdAndUpdate(productId,updateData);
    return result;
}



export const bookServices = {
    getBooksFromDb,
    createBookInDb,
    getSpecificBookFromDb,
    updateBookInDb,
}