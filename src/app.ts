import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { bookRouter } from './app/modules/book/book.route';
const app: Application = express();

app.use(express.json());
app.use(cors());



app.use('/api/products', bookRouter)

app.get('/', (req: Request, res: Response) => {
    res.send({
        status: 200,
        message: "book-shop server is running..... .... ... .. ."
    })
});

export default app;