import { useState, useEffect } from "react";
import axios from "axios";
import { RAPIDAPI_KEY } from "@env";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request({
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: query,
      });

      console.log("Response Data:", response.data); // Debugging response
      setData(response.data.data || []); // Ensure fallback to an empty array
    } catch (err) {
      setError(err);
      console.error(
        "Fetch Error:",
        err.response?.data || err.message || "Unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, query]); // Re-run when endpoint or query changes

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
