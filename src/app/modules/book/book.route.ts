import express from 'express';
import { bookControllers } from './book.controller';

const router = express.Router();

router.post('/',bookControllers.createNewBook)
router.get('/',bookControllers.getAllBooks)
router.get('/:productId', bookControllers.getSpecificBook)

export const bookRouter = router; 