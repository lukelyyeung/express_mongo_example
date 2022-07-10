import bodyParser from 'body-parser';
import express from 'express';
import { userRouter } from './routers/user.router';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = express();
  await mongoose.connect('mongodb://localhost:27017/express_example');

  app.use(bodyParser.json());

  app.use('/users', userRouter);

  app.listen(4000, () => {
    console.log('Server listening on http://localhost:4000');
  });
}

bootstrap();

// irrelevant to time, mac address 

// Find the user with username / unique identifier e.g. email
// hashedPassword === hash(the password in payload + salt)
// if true -> auth success