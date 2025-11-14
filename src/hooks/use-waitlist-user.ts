// src/hooks/use-waitlist-user.ts (UPDATED)
"use client";

import { useState, useEffect, useCallback } from 'react';

// Define all 6 custom status levels
export type WaitlistUserStatus = 
  | 'On the List' 
  | 'Insider' 
  | 'Main Character' 
  | 'Power Up' 
  | 'G.O.A.T' 
  | 'Join the Movement'; // Used when localStorage is empty

export interface WaitlistUser {
  email: string;
  referralCount: number;
  statusLevel: WaitlistUserStatus;
  referralCode: string;
}

// Updated logic to determine the status level based on referrals
function getStatusLevel(referrals: number): WaitlistUserStatus {
  if (referrals >= 10) return 'G.O.A.T';
  if (referrals >= 5) return 'Power Up';
  if (referrals >= 2) return 'Main Character';
  if (referrals >= 1) return 'Insider';
  return 'On the List'; // 0 referrals
}

const STORAGE_KEY = 'waitlistUser';

export function useWaitlistUser() {
  const [user, setUser] = useState<WaitlistUser | null>(null);

  // On initial load, try to get the user from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // If no user data is found, set the status to the initial unjoined state
        setUser({
          email: '',
          referralCount: 0,
          statusLevel: 'Join the Movement',
          referralCode: '',
        });
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

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
    } catch (error) {
      console.error("Failed to save user to localStorage", error);
    }
  }, []);

  // Function to log the user out (clear data)
  const clearUser = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      // Reset user to the "unjoined" state
      setUser({
        email: '',
        referralCount: 0,
        statusLevel: 'Join the Movement',
        referralCode: '',
      });
    } catch (error) {
      console.error("Failed to clear user from localStorage", error);
    }
  }, []);

  return { user, saveUser, clearUser };
}