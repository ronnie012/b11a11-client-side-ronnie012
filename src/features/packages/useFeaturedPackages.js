import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const useFeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/packages/featured`);
        setPackages(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch featured packages');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPackages();
  }, []); // Empty dependency array means this runs once on mount

  return { packages, loading, error };
};

export default useFeaturedPackages;


