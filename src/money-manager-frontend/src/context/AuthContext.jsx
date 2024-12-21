import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [actor, setActor] = useState(null);

  useEffect(() => {
    // Initialize connection to IC canister
    const initActor = async () => {
      try {
        // In a real app, you would initialize the actor here
        // This is just a placeholder
        setActor(window.actor);
      } catch (error) {
        console.error('Error initializing actor:', error);
      }
    };

    initActor();
  }, []);

  return (
    <AuthContext.Provider value={{ actor }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};