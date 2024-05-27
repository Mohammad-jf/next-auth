import User from '@/models/User';
import { verifyPassword } from '@/utils/auth';
import connectDB from '@/utils/connectDB';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      //   name: 'Credentials',
      //   credentials: {
      //     email: { label: 'Email', type: 'text', placeholder: 'Email' },
      //     password: {
      //       label: 'Password',
      //       type: 'password',
      //       placeholder: 'Password',
      //     },
      //   },

      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await connectDB();
        } catch (error) {
          throw new Error('error in connecting to DB');
        }

        if (!email || !password) {
          throw new Error('invalid user credentials');
        }

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('user does not exist');
        }

        const verifiedPassword = await verifyPassword(password, user.password);

        if (!verifiedPassword) {
          throw new Error('email or password is wrong');
        }

        return { email };
      },
    }),
  ],
  
  //   pages: {
  //     signIn: '/users/signIn',
  //   },
};

export default NextAuth(authOptions);
