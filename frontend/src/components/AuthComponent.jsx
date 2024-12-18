import '../styles/ProductForm.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { backURL } from '../utils/api';

const AuthComponent = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backURL}/api/auth/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backURL}/api/auth/register`, { username, password });
      setIsRegister(false);
      setError(null);
      alert('Registration successful! Please log in.');
    } catch (error) {
      console.error('Error registering:', error.response ? error.response.data : error.message);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="auth-button">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <button className="toggle-button" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default AuthComponent;