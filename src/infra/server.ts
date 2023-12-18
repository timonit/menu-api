import { config } from 'dotenv';
import express from 'express';
import { router } from './router';
import bodyParser from 'body-parser';

config();
const port = process.env.PORT;


const app = express();

app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
