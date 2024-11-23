import { Request, Response } from "express";
import { bookServices } from "./book.service";


// get books
const getAllBooks = async (req: Request, res: Response) => {

    try {
        const result = await bookServices.getBooksFromDb();
        res.status(201).json({
            "message": "Books retrieved successfully",
            "status": true,
            "data": result,
        })

    } catch (error) {
        res.status(400).json({
            message: 'Failed to get Books',
            success: false,
            error: error,
        })
    }
}

// createNewBook 

const createNewBook = async (req: Request, res: Response) => {
    try {
        const bookData = req.body;
        const result = await bookServices.createBookInDb(bookData);
        res.status(201).json({
            message: "Book created successfully",
            success: true,
            data: result
        })
    } catch (error) {
        res.status(400).json({
            seccess: false,
            message: 'Book can`t created',
            data: error,
        });
    }
}


export const bookControllers = {
    getAllBooks,
    createNewBook,
}