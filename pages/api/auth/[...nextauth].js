import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  // Configure one or more authentication providers
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
        return {
          name: 'mohammad',
        };
      },
    }),
  ],
//   pages: {
//     signIn: '/users/signIn',
//   },
};

export default NextAuth(authOptions);
