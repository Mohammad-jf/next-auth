import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('/dashboard')
        }

    }, []);

    const saveHandler = async () => {
        const res = await fetch('/api/auth/signup', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": 'application/json' }
        });

        const data = await res.json();
        console.log(data);
        if (data.status === 'success') {
            router.push('/users/signIn')
        }
        setEmail('')
        setPassword('')
    }

    return (
        <div className='form-container'>
            <h3>Registration form</h3>
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

            <button className='btn' onClick={saveHandler}>Register</button>
        </div>
    )
}

export default Register