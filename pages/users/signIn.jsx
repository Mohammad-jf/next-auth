import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react';

const SignIn = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //     fetch('/api/user').then((res) => res.json()).then((data) => {
    //         if (data.status === 'success') {
    //             window.location.href = '/dashboard'
    //         }
    //     })
    // }, []);

    const signInHandler = async () => {
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,

        })

        console.log(res)
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