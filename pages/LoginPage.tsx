
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import BackButton from '../components/BackButton';

const LoginIllustration = () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 h-24 w-24 text-primary">
        <path d="M15 7.5C15 9.98528 12.9853 12 10.5 12C8.01472 12 6 9.98528 6 7.5C6 5.01472 8.01472 3 10.5 3C12.9853 3 15 5.01472 15 7.5Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3.16016 21.0001C3.33235 17.5647 6.01848 14.868 9.48275 14.6198C13.2678 14.3486 16.4022 16.7118 17.5146 20.0001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 14L17 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 17L14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
        setSuccessMessage(location.state.successMessage);
        // Clear location state to prevent message from re-appearing on refresh or navigation
        window.history.replaceState({}, document.title)
    }
  }, [location.state]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <BackButton />
      <div className="w-full bg-dark-card p-8 rounded-lg shadow-lg border border-dark-border">
        <LoginIllustration />
        <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back!</h2>
        <p className="text-center text-dark-text-secondary mb-8">Login to continue to SkillForge.</p>
        
        {successMessage && <p className="bg-green-900 border border-green-700 text-green-300 text-sm rounded-lg p-3 text-center mb-4">{successMessage}</p>}
        {error && <p className="bg-red-900 border border-red-700 text-red-300 text-sm rounded-lg p-3 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark-text-secondary mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-secondary border border-dark-border rounded-lg p-3 text-white focus:ring-primary focus:border-primary"
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-dark-text-secondary mb-1">Password</label>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <div className="text-right">
              <a href="#" className="text-sm text-primary-hover hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-colors">
            Login
          </button>
        </form>
         <p className="text-sm text-center text-dark-text-secondary mt-6">
            Don't have an account? <Link to="/signup" className="font-medium text-primary hover:underline">Sign Up</Link>
         </p>
      </div>
    </div>
  );
};

export default LoginPage;
