import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const usePackages = (searchTerm = '') => { // Accept searchTerm as a parameter
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null); // Reset error on new fetch
      try {
        // setLoading(true);
        // const response = await axios.get(`${API_BASE_URL}/packages`);
        // Construct URL with search term if provided
        let url = `${API_BASE_URL}/packages`;
        if (searchTerm) {
          url += `?search=${encodeURIComponent(searchTerm)}`;
        }
        const response = await axios.get(url);
        setPackages(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch packages');
        setPackages([]); // Clear packages on error
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  // }, []); // Empty dependency array means this runs once on mount
  }, [searchTerm]);  // Re-run effect if searchTerm changes

  return { packages, loading, error };
};

export default usePackages;