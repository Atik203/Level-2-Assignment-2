/*
 * Title: order.controller.ts
 * Description: Order controller functions for the order module.
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */

import { Request, Response } from 'express';
import { z } from 'zod';
import { productService } from '../product/product.service';
import { OrderService } from './order.service';
import { orderValidationSchemaZod } from './order.zod.validation';

// createOrder function is used to create a new order in the database.
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const productId: string = order.productId;

    const product = await productService.getProductByIdFromDB(productId);

    // Check if the product exists in the database
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }
    const productQuantity = product.inventory.quantity;
    const inStock = product.inventory.inStock;
    const orderQuantity = order.quantity;

    // Check if the order quantity is greater than the product quantity
    if (orderQuantity > productQuantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
      return;
    }

    // Check if the product is out of stock
    if (!inStock) {
      res.status(400).json({
        success: false,
        message: 'Product is out of stock',
      });
      return;
    }

    // update the product stock
    const newQuantity = productQuantity - orderQuantity;
    await productService.updateProductStock(product, newQuantity);

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

// getAllOrders function is used to get all orders from the database.
const getAllOrders = async (req: Request, res: Response) => {
  try {
    let result;
    const { email } = req.query;

    // Check if email is provided in the query
    if (email) {
      result = await OrderService.getOrderByEmailFromDB(email as string);
      // If the email didn't match any orders, return a 404 status code with a message.
      if (result && result.length === 0) {
        res.status(404).json({
          success: false,
          message: `No orders found for email '${email}'.`,
        });
        return;
      }
    } else {
      result = await OrderService.getAllOrdersFromDB();
      // If there are no orders at all, return a 404 status code with a message.
      if (result && result.length === 0) {
        res.status(404).json({
          success: false,
          message: 'No orders found.',
        });
        return;
      }
    }
    res.status(200).json({
      success: true,
      message: email
        ? `Orders fetched successfully for email '${email}'!`
        : 'All orders fetched successfully!',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
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

export const OrderController = {
  createOrder,
  getAllOrders,
};
