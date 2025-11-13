// src/hooks/use-waitlist-user.ts (NEW FILE)
"use client";

import { useState, useEffect, useCallback } from 'react';

// This is the data structure we'll store
export type WaitlistUserStatus = 'New Seeker' | 'Rising Talent' | 'Inner Circle';

export interface WaitlistUser {
  email: string;
  referralCount: number;
  statusLevel: WaitlistUserStatus;
  referralCode: string;
}

// Helper function to get the status level
function getStatusLevel(referrals: number): WaitlistUserStatus {
  if (referrals >= 10) return 'Inner Circle';
  if (referrals >= 5) return 'Rising Talent';
  return 'New Seeker';
}

const STORAGE_KEY = 'waitlistUser';

// A custom hook to safely access localStorage
export function useWaitlistUser() {
  const [user, setUser] = useState<WaitlistUser | null>(null);

  // On initial load, try to get the user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Function to save a new user (called by Viral Loops)
  const saveUser = useCallback((email: string, referralCode: string, referrals: number = 0) => {
    const newUser: WaitlistUser = {
      email,
      referralCount: referrals,
      statusLevel: getStatusLevel(referrals),
      referralCode,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);
      console.log('Waitlist user saved to localStorage', newUser);
    } catch (error) {
      console.error("Failed to save user to localStorage", error);
    }
  }, []);

  // Function to log the user out (clear data)
  const clearUser = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error("Failed to clear user from localStorage", error);
    }
  }, []);

  return { user, saveUser, clearUser };
}