import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  email: String,
  salt: String,
  password: String,
  createdAt: Date,
  modifiedAt: Date,
});

export const UserModel = model('User', userSchema);
