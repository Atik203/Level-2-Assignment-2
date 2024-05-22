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
  res.send('Hello World! This is a simple Express app.');
});

export default app;
