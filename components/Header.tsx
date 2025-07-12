import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SwapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
)

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-dark-card border-b border-dark-border shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
          <SwapIcon />
          SkillForge
        </Link>
        <nav className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <Link to="/dashboard" className="text-dark-text-secondary hover:text-white transition-colors">Dashboard</Link>
              <Link to="/requests" className="text-dark-text-secondary hover:text-white transition-colors">Swap Requests</Link>
              <div className="flex items-center gap-3">
                 <Link to="/profile" className="flex items-center gap-2 text-white font-medium">
                  <img src={user.profilePhotoUrl} alt={user.name} className="w-9 h-9 rounded-full border-2 border-primary" />
                  <span>{user.name}</span>
                 </Link>
                 <button onClick={() => { logout(); navigate('/'); }} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                   Logout
                 </button>
              </div>
            </>
          ) : (
             <>
              <Link to="/" className="text-dark-text-secondary hover:text-white transition-colors">Home</Link>
               <Link to="/signup" className="text-dark-text-secondary hover:text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Sign Up
              </Link>
              <Link to="/login" className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                <UserIcon/>
                Login
              </Link>
             </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
