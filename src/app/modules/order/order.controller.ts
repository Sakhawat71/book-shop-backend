import { BookModel } from './../book/book.model';
import { NextFunction, Request, Response } from "express";
import { orderValidationSchema } from "./order.zod-validation";
import { orderService } from './order.service';


// create order
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderData = req.body;
        const validOrderData = orderValidationSchema.parse(orderData);


        // Check in database : is book available or not
        const foundBook = await BookModel.findById(validOrderData.product);
        if (!foundBook) {
            res.status(404).json({
                message: "Product not found",
                success: false,
                error: { name: "Resource not found", path: validOrderData.product }
            })
            return;
        }

        // Check quantity of book : Is store book quantity greaterthan order quantity or not
        if (foundBook.quantity < validOrderData.quantity) {
            res.status(400).json({
                message: "Insufficient stock",
                success: false,
                error: { name: "StockError", availableStock: foundBook.quantity },
            });
            return;
        }

        // Decrease book quantity and save 
        foundBook.quantity -= validOrderData.quantity;
        if (foundBook.quantity === 0) {
            foundBook.inStock = false;
        }
        await foundBook.save();

        // create an order
        const newOrder = await orderService.createAnOrder(validOrderData as any);
        res.status(201).json({
            message: "Order created successfully",
            success: true,
            data: newOrder,
        });

    } catch (error) {
        next(error)
    }
}

// Calculate Revenue from Orders
const getRevenue = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const totalRevenue = await orderService.calculateRevenueFromOrders();
        res.status(200).json({
            message: "Revenue calculated successfully",
            success: true,
            data: { totalRevenue },
        });

    } catch (error) {
        next(error)
    }
}


export const orderContrller = {
    createOrder,
    getRevenue,
}