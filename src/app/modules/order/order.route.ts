/*
 * Title: route file
 * Description: order route file for the order module
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */

import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);

export const orderRoute = router;
