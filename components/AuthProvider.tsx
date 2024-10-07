"use client"
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast'; // Replace with your actual toast library
import { isTokenExpired, removeAuthToken, getAuthToken } from '../utils/auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const hasShownToast = useRef(false);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = getAuthToken();
      if (token && isTokenExpired()) {
        removeAuthToken();
        if (!hasShownToast.current) {
          toast({
            variant: "destructive",
            title: "Session Expired ❌",
            description: "Your session has expired. Please log in again.",
          });
          hasShownToast.current = true;
        }
        router.push('/login');
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 5000);

    return () => clearInterval(intervalId);
  }, [router]);

  return <>{children}</>;
};