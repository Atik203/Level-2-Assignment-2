"use strict";
/*
 * Title: order.controller.ts
 * Description: Order controller functions for the order module.
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const zod_1 = require("zod");
const product_service_1 = require("../product/product.service");
const order_service_1 = require("./order.service");
const order_zod_validation_1 = require("./order.zod.validation");
// createOrder function is used to create a new order in the database.
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const productId = order.productId;
        const product = yield product_service_1.productService.getProductByIdFromDB(productId);
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
        yield product_service_1.productService.updateProductStock(product, newQuantity);
        const orderZodParse = order_zod_validation_1.orderValidationSchemaZod.parse(order);
        const result = yield order_service_1.OrderService.createOrderIntoDB(orderZodParse);
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                success: false,
                message: error.issues.map((issue) => issue.message).join(', '),
            });
        }
        else if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
});
// getAllOrders function is used to get all orders from the database.
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        const { email } = req.query;
        // Check if email is provided in the query
        if (email) {
            result = yield order_service_1.OrderService.getOrderByEmailFromDB(email);
        }
        else {
            result = yield order_service_1.OrderService.getAllOrdersFromDB();
        }
        if (result) {
            res.status(200).json({
                success: true,
                message: email
                    ? 'Orders fetched successfully for user email!'
                    : 'All orders fetched successfully!',
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
});
exports.OrderController = {
    createOrder,
    getAllOrders,
};
