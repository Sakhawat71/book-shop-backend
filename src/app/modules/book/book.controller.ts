import { Request, Response } from "express";
import { bookServices } from "./book.service";
import { bookValidateSchema } from "./book.zod-validation";


// createNewBook 

const createNewBook = async (req: Request, res: Response) => {
    try {
        const bookData = req.body;

        const validatBookData = bookValidateSchema.parse(bookData);
        const result = await bookServices.createBookInDb(validatBookData);

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


// Get a Specific Book
const getSpecificBook = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { productId } = req.params;
        const result = await bookServices.getSpecificBookFromDb(productId);

        if (!result) {
            res.status(404).json({
                message: "Book not found",
                status: false,
                data : {}
            });
            return ;
        }

        res.status(201).json({
            messag: "Book retrieved successfully",
            status: true,
            data: result,
        })

    } catch (error) {
        res.status(400).json({
            message: 'Failed to get Specific Book by Id',
            success: false,
            error: error,
        })
    }
}


// Update a Book
const updateBookById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const updateData = req.body;

        if (!updateData || Object.keys(updateData).length === 0) {
            res.status(400).json({
                message: "No update data provided",
                status: false,
                data: null,
            });
            return;
        }

        const result = await bookServices.updateBookInDb(productId, updateData)

        if (!result) {
            res.status(404).json({
                message: "Book not found",
                status: false,
                date: null,
            });
            return;
        }

        res.status(201).json({
            message: "Book updated successfully",
            status: true,
            data: result,
        })

    } catch (error) {
        res.status(400).json({
            message: "Failed to update the book",
            status: false,
            error: error,
        });
    }
}


// delete a book
const deleteABookById = async (req: Request, res: Response) :Promise<void> => {
    try {
        const { productId } = req.params;
        const result = await bookServices.deleteBookFromDb(productId);

        if(!result){
            res.status(404).json({
                message: "Book not found",
                status: false,
                data : {}
            })
            return;
        }

        res.status(201).json({
            message: "Book deleted successfully",
            statu: true,
            data: {}
        })

    } catch (error) {
        res.status(400).json({
            message: "Can't delete this book",
            status: false,
            data: error
        })
    }
}



export const bookControllers = {
    getAllBooks,
    createNewBook,
    getSpecificBook,
    updateBookById,
    deleteABookById,
}