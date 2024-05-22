"use strict";
/*
 * Title: route file
 * Description: order route file for the order module
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post('/', order_controller_1.OrderController.createOrder);
router.get('/', order_controller_1.OrderController.getAllOrders);
exports.orderRoute = router;
