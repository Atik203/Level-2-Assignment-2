import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.get('/', OrderController.createOrder);

export const orderRoute = router;
