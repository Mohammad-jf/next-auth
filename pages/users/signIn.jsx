import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react';

const SignIn = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { status } = useSession();


    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('/dashboard')
        }
    }, []);

    const signInHandler = async () => {
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,

        })

        if (res.status === 200) {
            router.replace('/dashboard');
        }
        setEmail('')
        setPassword('')
    }

    return (
        <div className='form-container'>
            <h3>Sign In</h3>
            <div className='form-group' >
                <input
                    placeholder='Email'
                    type="email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='form-group'>
                <input
                    placeholder='Password'
                    type="password"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

            </div>

            <button className='btn' onClick={signInHandler}>Sign In</button>
        </div>
    )
}

export default SignIn