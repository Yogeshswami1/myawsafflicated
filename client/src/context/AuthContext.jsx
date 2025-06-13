import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email;
        const username = email.split('@')[0];
        setUser({ loggedIn: true, email, username });
        console.log('User logged in:', { email, username });
      } else {
        setUser(null);
        console.log('User logged out');
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const lowercaseEmail = email.toLowerCase();
      await signInWithEmailAndPassword(auth, lowercaseEmail, password);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const signup = async (email, password) => {
    try {
      const lowercaseEmail = email.toLowerCase();
      await createUserWithEmailAndPassword(auth, lowercaseEmail, password);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: error.message || 'Signup failed' };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};