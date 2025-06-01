import { useEffect, useState } from 'react';
import { MedalData } from '@/types/medals';

export const useMedals = () => {
  const [data, setData] = useState<MedalData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/medals')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch medal data');
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return { data, error };
};
