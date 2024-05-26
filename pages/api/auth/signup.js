import User from '@/models/User';
import { hashPassword } from '@/utils/auth';
import connectDB from '@/utils/connectDB';

export default async function handler(req, res) {
  if (req.method !== 'POST') return;

  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 'failed', message: 'DB connection failed' });
  }

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(422)
        .json({ status: 'failed', message: 'invalid user credential' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(422)
        .json({ status: 'failed', message: 'user already exist' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ status: 'success', message: 'user created', data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'failed', message: 'something went wrong' });
  }
}
