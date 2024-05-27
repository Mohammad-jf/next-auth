import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { status } = useSession();

  const signOutHandler = async () => {
    await signOut();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <h3>Authentication In Next.js Applications</h3>
      <div className='btn-group'>
        {isLoggedIn && (
          <>
            <Link href='/dashboard'>
              <button className='btn'>Dashboard</button>
            </Link>
            <button className='btn' onClick={signOutHandler}>
              Log Out
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link href='/users/register'>
              <button className='btn'>Sign Up</button>
            </Link>
            <Link href='/users/signIn'>
              <button className='btn'>Sign In</button>
            </Link>
          </>
        )}
      </div>

      {/* <div className='btn-group'>
        <Link href='/dashboard'>
          <button className='btn'>Dashboard</button>
        </Link>
        <button className='btn' onClick={signOutHandler}>
          Log Out
        </button>

        <Link href='/users/register'>
          <button className='btn'>Sign Up</button>
        </Link>
        <Link href='/users/signIn'>
          <button className='btn'>Sign In</button>
        </Link>
      </div> */}
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { token } = context.req.cookies;
//   const secretKey = process.env.SECRET_KEY;
//   const tokenVerifyResult = verifyToken(token, secretKey);

//   if (!tokenVerifyResult) {
//     return {
//       props: {
//         isLogged: false,
//       },
//     };
//   }

//   return {
//     props: {
//       isLogged: true,
//     },
//   };
// }
