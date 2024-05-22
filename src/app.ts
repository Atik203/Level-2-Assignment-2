import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World! This is a simple Express app.');
});

export default app;
