import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = ({ token }) => {
    setUser({ token }); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('Authorization');
  };

  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      setUser({ token }); 
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
