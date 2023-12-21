import { config } from 'dotenv';
import express, { Errback, NextFunction, Request, Response } from 'express';
import { router } from './router';
import bodyParser from 'body-parser';

config();
const port = process.env.PORT;


const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'POST, PATCH, DELETE');
  next();
});
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
