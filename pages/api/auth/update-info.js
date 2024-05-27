import User from '@/models/User';
import { verifyPassword } from '@/utils/auth';
import connectDB from '@/utils/connectDB';
import { getSession } from 'next-auth/react';

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

  const { name, lastName, password } = req.body;
  const session = await getSession({ req });
  const email = session.user.email;

  try {
    if (!session) {
      return res
        .status(401)
        .json({ status: 'failed', message: 'unAuthorized' });
    }

    if (!name || !lastName || !password) {
      return res
        .status(422)
        .json({ status: 'failed', message: 'invalid user credentials' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ status: 'failed', message: 'user not found' });
    }

    const isvalid = await verifyPassword(password, user.password);
    if (!isvalid) {
      return res
        .status(422)
        .json({ status: 'failed', message: 'invalid user credentials' });
    }

    user.name = name;
    user.lastName = lastName;
    await user.save();
    res.status(200).json({
      status: 'success',
      message: 'user updated',
      user: { name: user.name, lastName: user.lastName },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 'failed', message: 'server internal error' });
  }
}
