import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../database/firebase-config';
import { useSetAtom } from 'jotai';
import { loggedInUserDetails } from '../../helpers/atoms';

function Login({ onLoginSuccess }) {
  const setUserCredentials = useSetAtom(loggedInUserDetails)
  const [isLoggingIn, toggleLoggingInState] = useState(false)
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    toggleLoggingInState(true)
    if (!loginData.username || !loginData.password) {
      alert('Please enter username and password.');
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, loginData?.username, loginData?.password)
      setUserCredentials(res)
      // Simulate login success
      alert(`Welcome back, ${loginData.username}!`);
      if (onLoginSuccess) {
        onLoginSuccess(loginData.username);
      }
      toggleLoggingInState(false)
    } catch (error) {
      alert('Access denied.')
      console.error(error)
      toggleLoggingInState(false)
      return
    }
  };

  const toggleLoginPasswordVisibility = () => {
    setLoginPasswordVisible(!loginPasswordVisible);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">
        <span className="highlight">Student</span>Management
      </h1>
      <form onSubmit={handleLoginSubmit} noValidate>
        <div className="mb-6">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            autoComplete="username"
            placeholder="Enter your username"
            value={loginData.username}
            onChange={handleLoginChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password">Password</label>
          <input
            type={loginPasswordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <button type="button" onClick={toggleLoginPasswordVisibility} className="toggle-password-btn">
            {loginPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit" disabled={isLoggingIn}>{isLoggingIn ? 'Logging In...' : 'Log In'}</button>
      </form>
      <p className="footer-text">&copy; 2025 Student Management. All rights reserved.</p>
    </div>
  );
}

export default Login;
