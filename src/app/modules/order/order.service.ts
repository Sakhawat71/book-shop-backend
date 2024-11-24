import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";


const createAnOrder = async (orderData : IOrder) => {
    const result = await OrderModel.create(orderData);
    return result;
}



export const orderService = {
    createAnOrder,
}