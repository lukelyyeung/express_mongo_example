import { Response, Request } from 'express';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const getUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find();

  res.json(users);
};

interface RegisterPayload {
  email: string;
  password: string;
}

// type guard
function isValidRegisterPayload(payload: unknown): payload is RegisterPayload {
  const castedPayload = payload as RegisterPayload;

  if (!castedPayload.email) {
    throw new Error('Email is required');
  }

  if (!castedPayload.password) {
    throw new Error('Password is required');
  }

  return true;
}

export const register = async (req: Request, res: Response) => {
  const body = req.body;

  if (!isValidRegisterPayload(body)) {
    return;
  }

  const existingUser = await UserModel.findOne({ email: body.email });

  if (existingUser) {
    // 200 - 299 successful
    // 400 - 499 customer's fault
    // 500 - 599 server's fault
    res.status(422).json({
      error: 'Email is used',
    });

    return;
  }

  const salt = crypto.randomBytes(16).toString('hex');

  const hashPassword = await bcrypt.hash(body.password + salt, 10);

  const user = await UserModel.create({
    email: body.email,
    salt,
    password: hashPassword,
  });

  res.status(201).json({
    id: user._id,
    email: user.email,
  });
};
