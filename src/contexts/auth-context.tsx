"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@/types';
import { mockUsers } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (provider: 'google' | 'apple' | 'anonymous') => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock checking for a logged-in user in localStorage
    try {
      const storedUser = localStorage.getItem('tetraBlazeUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error)
      localStorage.removeItem('tetraBlazeUser');
    }
    setLoading(false);
  }, []);

  const login = (provider: 'google' | 'apple' | 'anonymous') => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let mockUser: User;
      if (provider === 'anonymous') {
        mockUser = mockUsers.find(u => u.uid === 'anonymous1')!;
      } else {
        // For Google/Apple, just pick a default mock user
        mockUser = mockUsers.find(u => u.uid === 'user1')!;
      }
      setUser(mockUser);
      localStorage.setItem('tetraBlazeUser', JSON.stringify(mockUser));
      setLoading(false);
    }, 500);
  };

  const logout = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser(null);
      localStorage.removeItem('tetraBlazeUser');
      setLoading(false);
    }, 500);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
