import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTHENTICATION_TOKEN } from '../helpers/constants/StaticKeys';
import AppStorage from '../helpers/Storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Restore user session from localStorage
    const savedUser = localStorage.getItem('admin_user');
    const savedToken = AppStorage.getItem(AUTHENTICATION_TOKEN);
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    } else {
      // If either is missing, clean up both
      localStorage.removeItem('admin_user');
      AppStorage.removeItem(AUTHENTICATION_TOKEN);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('admin_user', JSON.stringify(userData));
    AppStorage.setItem(AUTHENTICATION_TOKEN, token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
    AppStorage.removeItem(AUTHENTICATION_TOKEN);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
