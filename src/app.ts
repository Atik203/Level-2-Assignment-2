/*
 * Title: App File
 * Description: App file for the project
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */

import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { orderRoute } from './app/modules/order/order.route';
import { productRoute } from './app/modules/product/product.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products/', productRoute);
app.use('/api/orders/', orderRoute);

app.get('/', async (req: Request, res: Response) => {
  res.send('Server is running');
});

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});
export default app;
