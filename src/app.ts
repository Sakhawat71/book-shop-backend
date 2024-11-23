import express, { Application, Request, Response } from 'express';
const app: Application = express();


app.get('/', (req: Request, res: Response) => {
    res.send({
        status: 200,
        message: "book-shop server is running..............."
    })
});

export default app;