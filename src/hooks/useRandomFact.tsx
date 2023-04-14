import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

type RandomFact = {
  text: string;
};

export const useRandomFact = (trigger: boolean) => {
  const [randomFact, setRandomFact] = useState<RandomFact | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomFact = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
      setRandomFact(response.data);
    } catch {
      setError('Failed to fetch random fact');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (trigger) {
      getRandomFact();
    } else {
      setRandomFact(null);
    }
  }, [getRandomFact, trigger]);

  return [isLoading, error, randomFact] as const;
};
