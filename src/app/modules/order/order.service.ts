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

const getOrderByEmailFromDB = async (email: string): Promise<TOrder | null> => {
  const result = await Order.findOne({ email });
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrderByEmailFromDB,
};