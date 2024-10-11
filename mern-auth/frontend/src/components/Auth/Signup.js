import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css'; // Ensure App.css is in the correct location
import myLogo from '../../assets/GatorFoundLogo.png';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log('Signing up with:', { email, password });
    // Add your signup logic here
  };

  return (
    <div className="full-page signup-page">
      <img src={myLogo} alt="Logo" className={"small-logo"} />
      <h2>SIGN UP</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
    </div>
  );
};

export default Signup;
