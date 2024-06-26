/*
 * Title: Order Service
 * Description: order service related functions for the order module.
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */

import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: TOrder): Promise<TOrder> => {
  const result = await Order.create(order);
  return result;
};

const getAllOrdersFromDB = async (): Promise<TOrder[]> => {
  const result = await Order.find();
  return result;
};

const getOrderByEmailFromDB = async (
  email: string,
): Promise<TOrder[] | null> => {
  const result = await Order.find({ email });
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrderByEmailFromDB,
};
