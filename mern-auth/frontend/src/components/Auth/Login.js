import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css'; // Ensure App.css is in the correct location
import myLogo from '../../assets/GatorFoundLogo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    // Add your login logic here
  };

  return (
    <div className="full-page login-page">
    <img src={myLogo} alt="Logo" className={"small-logo"} />
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
    </div>
  );
};

export default Login;
