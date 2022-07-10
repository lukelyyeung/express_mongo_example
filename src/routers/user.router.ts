import { Router } from 'express';
import { getUsers, register } from '../handlers/getUsers.handler';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.post('/register', register);

export { userRouter };
