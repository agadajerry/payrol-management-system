import { useState } from "react";

const useApi = async (requstFunc: any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const request = async (...args: any) => {
    setLoading(true);
    const response = await requstFunc(...args);
    setLoading(false);

    if (!response.ok) {
      if (response.data) setError(response.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(response);
      }
      return response;
    }

    setData(response.data);
    return response;
  };

  return { data, loading, error, request };
};

export default useApi;
