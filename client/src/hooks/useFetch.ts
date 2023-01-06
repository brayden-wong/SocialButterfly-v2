import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetch = (method: string, url: string, body: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>('');
  
  useEffect(() => {
    setIsLoading(true);

    const response = async() => {
      try {
        const response = await axios({
          method: method,
          url: url,
          data: body
        });
        const data = await response?.data;
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    response();


  }, [method, url, body]);

  return { isLoading, data, error };
}