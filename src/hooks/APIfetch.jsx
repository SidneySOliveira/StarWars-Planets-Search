import { useState, useEffect } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const endpoint = 'https://swapi.dev/api/planets';

  useEffect(() => {
    const getStarsAPI = async () => {
      setIsLoading(true);
      const response = await fetch(endpoint);
      const result = await response.json();
      setData(result.results.map(({ residents, ...filtered }) => filtered));
      setIsLoading(false);
    };
    getStarsAPI();
  }, [setData]);

  return { isLoading, data };
};

export default useFetch;
