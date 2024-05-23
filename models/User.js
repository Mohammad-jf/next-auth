import mongoose from 'mongoose';
import { models } from 'mongoose';

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: { type: String },
    lastName: { type: String },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema);

export default User;
