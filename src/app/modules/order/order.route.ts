import express from 'express';
import { orderContrller } from './order.controller';

const router = express.Router()

router.post('/', orderContrller.createOrder)

export const orderRouter = router;