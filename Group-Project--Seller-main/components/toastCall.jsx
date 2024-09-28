'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ClientToastWithRedirect = ({ message, redirectTo }) => {
  const router = useRouter();

  useEffect(() => {
    if (message) {
      toast.error(message);
      
      const timer = setTimeout(() => {
        router.push(redirectTo);
      }, 2000); 

      return () => clearTimeout(timer); 
    }
  }, [message, redirectTo, router]);

  return null; 
};

export default ClientToastWithRedirect;
