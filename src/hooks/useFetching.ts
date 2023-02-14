import { useState } from 'react';

export const useFetching = (callback: (...args: any[]) => void, loading: boolean = false):
  [boolean, string, (...args: any[]) => void] => {
  const [isLoading, setIsLoading] = useState<boolean>(loading);
  const [error, setError] = useState<string>('');

  const fetching = async (...args: any[]) => {
    setError('');
    setIsLoading(true);
    try {
      await callback(args);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, error, fetching];
};
