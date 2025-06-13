import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const res = await axios.get(`${apiUrl}/api/auth/profile`);
          if (res.data.email && typeof res.data.email === 'string') {
            console.log('Profile fetched successfully:', res.data);
            const username = res.data.email.split('@')[0];
            setUser({ loggedIn: true, email: res.data.email, username });
          } else {
            throw new Error('Email not found or invalid in profile response');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          if (error.response && (error.response.status === 404 || error.response.status === 401)) {
            logout();
          } else {
            setUser(null);
            setToken('');
            localStorage.removeItem('token');
          }
        }
      } else {
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      }
    };

    fetchProfile();
  }, [token]);

  const login = async (email, password) => {
    try {
      const lowercaseEmail = email.toLowerCase();
      console.log('Login request body:', { email: lowercaseEmail, password });
      const res = await axios.post(`${apiUrl}/api/auth/login`, { email: lowercaseEmail, password });
      const { token, email: userEmail } = res.data;
      if (!userEmail || typeof userEmail !== 'string') {
        throw new Error('Email not found in login response');
      }
      const username = userEmail.split('@')[0];
      localStorage.setItem('token', token);
      setToken(token);
      console.log('User after login:', { loggedIn: true, email: userEmail, username });
      setUser({ loggedIn: true, email: userEmail, username });
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const signup = async (email, password) => {
    try {
      const lowercaseEmail = email.toLowerCase();
      console.log('Signup request body:', { email: lowercaseEmail, password });
      const res = await axios.post(`${apiUrl}/api/auth/signup`, { email: lowercaseEmail, password });
      const { token } = res.data;
      if (!lowercaseEmail || typeof lowercaseEmail !== 'string') {
        throw new Error('Email not found in signup request');
      }
      const username = lowercaseEmail.split('@')[0];
      localStorage.setItem('token', token);
      setToken(token);
      console.log('User after signup:', { loggedIn: true, email: lowercaseEmail, username });
      setUser({ loggedIn: true, email: lowercaseEmail, username });
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: error.response?.data?.message || 'Signup failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};