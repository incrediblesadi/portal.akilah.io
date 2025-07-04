import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signIn as amplifySignIn, signOut as amplifySignOut, signUp as amplifySignUp, confirmSignUp as amplifyConfirmSignUp, getCurrentUser } from 'aws-amplify/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  signIn: (username: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  signUp: (username: string, password: string, email: string) => Promise<any>;
  confirmSignUp: (username: string, code: string) => Promise<any>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser();
      setIsAuthenticated(true);
      setUser(currentUser);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      const user = await amplifySignIn({ username, password });
      setIsAuthenticated(true);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await amplifySignOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const signUp = async (username: string, password: string, email: string) => {
    try {
      const result = await amplifySignUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  const confirmSignUp = async (username: string, code: string) => {
    try {
      return await amplifyConfirmSignUp({ username, confirmationCode: code });
    } catch (error) {
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    user,
    signIn,
    signOut,
    signUp,
    confirmSignUp,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};