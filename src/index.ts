import bodyParser from 'body-parser';
import express from 'express';
import { userRouter } from './routers/user.router';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = express();
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING!);

  app.use(bodyParser.json());

  app.get('/', (_, res) => res.send({ status: 'ok' }));

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
