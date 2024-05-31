import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import Popup from './exception-popup';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const usernameValue = e.target.value;
    setUsername(usernameValue);

    if (usernameValue.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
    } else {
      setUsernameError('');
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usernameError || passwordError) {
      return;
    }

    // Validation (replace with your actual authentication logic)
    if (username === '1' && password === '1' || username === 'rana' && password === 'rana123' || username === 'rayyan' && password === 'rayyan123' || username === 'jahanzaib' && password === 'jahanzaib123'|| username === 'saad123' && password === 'saad') { // Simple check (not secure)
      setUsername('');
      setPassword('');
      onLogin(); // Call the passed-in login function
      navigate('/Sidebar/Dashboard');
    } else {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Billing and Patient Management System</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              required
            />
            {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
            />
            {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
          </div>
          <button type="submit">Login</button>
        </form>
        {showPopup && <Popup message="Invalid username or password." onClose={closePopup} />}
      </div>
    </div>
  );
};

export default LoginForm;