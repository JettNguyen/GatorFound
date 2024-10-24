import React, { useState } from 'react';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState(''); // New state for username
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login or register action
        setIsLoggedIn(true);
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
