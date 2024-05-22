import { Request, Response } from 'express';
import { z } from 'zod';
import { OrderService } from './order.service';
import { orderValidationSchemaZod } from './order.zod.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const orderZodParse = orderValidationSchemaZod.parse(order);
    const result = await OrderService.createOrderIntoDB(orderZodParse);
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.issues.map((issue) => issue.message).join(', '),
      });
    } else if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    let result;
    const { email } = req.query;

    if (email) {
      result = await OrderService.getOrderByEmailFromDB(email as string);
    } else {
      result = await OrderService.getAllOrdersFromDB();
    }

    if (result) {
      res.status(200).json({
        success: true,
        message: email
          ? 'Orders fetched successfully for user email!'
          : 'All orders fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
