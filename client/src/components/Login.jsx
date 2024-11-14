import React, { useState } from 'react';
import logo from './GatorFoundLogo.png';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState(''); // New state for username
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!isRegister){
            try{
            const response = await fetch('http://localhost:5000/GatorFound/login', {
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
            } else {
                alert('Login failed!');
                }
            } catch (error){
                console.error('Error during login:', error);
                alert(error.message);
            }
        }
        // Sign up
        else {
            try{
                const response = await fetch('http://localhost:5000/GatorFound/register', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email,username, password}),
                });
                const data = await response.json();

                if (!response.ok){
                    throw new Error(data.message || 'Sign up failed! Please provide correct information!');
                }
                else {
                    setIsLoggedIn(false);
                    
                    alert('Sign up successfully! Please sign in again!');
                    window.location.reload();
    
                    }
                } catch (error){
                    console.error('Error during login:', error);
                    alert(error.message);
                }
        }
    };

    return (
        <div className="login">
            <img src={logo} alt="Gator Found Logo" className="logo" />
            <h2>{isRegister ? 'Create Account' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {/* Conditionally show the username field only in Register mode */}
                {isRegister && (
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                )}
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
