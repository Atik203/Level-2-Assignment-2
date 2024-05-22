import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: TOrder): Promise<TOrder> => {
  const result = await Order.create(order);
  return result;
};

export const OrderService = {
  createOrderIntoDB,
};
