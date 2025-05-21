import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [signupPasswordVisible, setSignupPasswordVisible] = useState(false);
  const [signupConfirmPasswordVisible, setSignupConfirmPasswordVisible] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupData.username || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      alert('Please fill in all fields to create an account.');
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    alert(`Account created for ${signupData.username} with email ${signupData.email}`);
    setSignupData({ username: '', email: '', password: '', confirmPassword: '' });
    setIsSignup(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      alert('Please enter username and password.');
      return;
    }
    // Simulate login success
    alert(`Welcome back, ${loginData.username}!`);
    if (onLoginSuccess) {
      onLoginSuccess(loginData.username);
    }
  };

  const toggleLoginPasswordVisibility = () => {
    setLoginPasswordVisible(!loginPasswordVisible);
  };

  const toggleSignupPasswordVisibility = () => {
    setSignupPasswordVisible(!signupPasswordVisible);
  };

  const toggleSignupConfirmPasswordVisibility = () => {
    setSignupConfirmPasswordVisible(!signupConfirmPasswordVisible);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">
        <span className="highlight">Student</span>Management
      </h1>
      {isSignup ? (
        <form onSubmit={handleSignupSubmit} noValidate>
          <div className="mb-6">
            <label htmlFor="signup-username">Username</label>
            <input
              type="text"
              id="signup-username"
              name="username"
              required
              placeholder="Enter your username"
              value={signupData.username}
              onChange={handleSignupChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="signup-email">Email</label>
            <input
              type="email"
              id="signup-email"
              name="email"
              required
              placeholder="Enter your email"
              value={signupData.email}
              onChange={handleSignupChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="signup-password">Password</label>
            <input
              type={signupPasswordVisible ? 'text' : 'password'}
              id="signup-password"
              name="password"
              required
              placeholder="Enter your password"
              value={signupData.password}
              onChange={handleSignupChange}
            />
            <button type="button" onClick={toggleSignupPasswordVisibility} className="toggle-password-btn">
              {signupPasswordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="mb-6">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <input
              type={signupConfirmPasswordVisible ? 'text' : 'password'}
              id="signup-confirm-password"
              name="confirmPassword"
              required
              placeholder="Confirm your password"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
            />
            <button type="button" onClick={toggleSignupConfirmPasswordVisibility} className="toggle-password-btn">
              {signupConfirmPasswordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit">Sign Up</button>
          <p>
            Already have an account?{' '}
            <button type="button" onClick={toggleForm} className="toggle-form-btn">
              Log In
            </button>
          </p>
        </form>
      ) : (
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
          <button type="submit">Log In</button>
          <p>
            Don't have an account?{' '}
            <button type="button" onClick={toggleForm} className="toggle-form-btn">
              Sign Up
            </button>
          </p>
        </form>
      )}
      <p className="footer-text">&copy; 2025 Student Management. All rights reserved.</p>
    </div>
  );
}

export default Login;
