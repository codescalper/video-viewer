"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast'; // Replace with your actual toast library
import { isTokenExpired, removeAuthToken } from '@/utils/auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isTokenExpired()) {
        removeAuthToken();
        toast({
          variant: "destructive",
          title: "Session Expired ❌",
          description: "Your session has expired. Please log in again.",
        });
        router.push('/login');
      }
    };

    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 5000);

    return () => clearInterval(intervalId);
  }, [router]);

  return <>{children}</>;
};
