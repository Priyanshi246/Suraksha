import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('suraksha_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('suraksha_user');
  });

  const login = (userData) => {
    const user = { ...userData, role: userData.role || 'user' };
    localStorage.setItem('suraksha_user', JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('suraksha_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = (userData) => {
    const user = { ...userData, role: 'user', createdAt: new Date().toISOString() };
    localStorage.setItem('suraksha_user', JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  return { user, isAuthenticated, login, logout, signup };
}
