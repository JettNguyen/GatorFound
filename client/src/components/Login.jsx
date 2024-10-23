// src/components/Login.jsx
import React, { useState } from 'react';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
        const response = await fetch('http://localhost:5001/GatorFound/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        });
        if (!response.ok){
            throw new Error('Login failed! Please check your information!');
        }
        const data = await response.json();
        if (data.token){
            localStorage.setItem('token', data.token);
        // Simulate login or register action
            setIsLoggedIn(true);
            alert('Login successful!');
        } else {
            alert('Login failed!');
        }
    } catch (error){
        console.error('Error during login:', error);
        alert(error.message);
    }
    };

    return (
        <div className="login">
            <h2>{isRegister ? 'Create Account' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Already have an account? Login' : 'Create Account'}
            </button>
        </div>
    );
};

export default Login;
