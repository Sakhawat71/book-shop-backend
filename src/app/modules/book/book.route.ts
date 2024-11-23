import express from 'express';
import { bookControllers } from './book.controller';

const router = express.Router();

router.get('/',bookControllers.getAllBooks)
router.post('/',bookControllers.createNewBook)

export const bookRouter = router; 