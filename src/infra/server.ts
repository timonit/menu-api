import { config } from 'dotenv';
import express, { Errback, NextFunction, Request, Response } from 'express';
import { router } from './router';
import bodyParser from 'body-parser';

config();
const port = process.env.PORT;


const app = express();

app.use(bodyParser.json());
app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.statusCode = 400;
  res.send(err)
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
