
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { loginUser, addUser, updateUserInStorage } from '../services/userService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (userData: Omit<User, 'id' | 'rating' | 'reviews' | 'feedback' | 'profilePhotoUrl'>) => {success: boolean; message: string};
  updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOGGED_IN_USER_KEY = 'skillforge_logged_in_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
        const storedUser = localStorage.getItem(LOGGED_IN_USER_KEY);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem(LOGGED_IN_USER_KEY);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
        localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(LOGGED_IN_USER_KEY);
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    const loggedInUser = loginUser(email, password);
    if (loggedInUser) {
        setUser(loggedInUser);
        return true;
    }
    return false;
  };

  const signup = (userData: Omit<User, 'id' | 'rating' | 'reviews' | 'feedback' | 'profilePhotoUrl'>) => {
      try {
        addUser(userData);
        return { success: true, message: 'Account created successfully!' };
      } catch (error: any) {
        return { success: false, message: error.message || "An error occurred during sign up." };
      }
  };

  const logout = () => {
    setUser(null);
  };
  
  const updateUser = (updatedUser: User) => {
    const savedUser = updateUserInStorage(updatedUser);
    setUser(savedUser);
  }

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
