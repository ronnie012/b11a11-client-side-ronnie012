import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const usePackages = (searchTerm = '', page = 1, limit = 10, sort = '') => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPackages, setTotalPackages] = useState(0);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `${API_BASE_URL}/packages?page=${page}&limit=${limit}`;
        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }
        if (sort) {
          url += `&sort=${sort}`;
        }
        console.log('Fetching packages from URL:', url);
        console.log('Fetching packages from URL:', url);
        const response = await axios.get(url);
        console.log('API Response:', response.data);
        setPackages(response.data);
        // The API response does not seem to include totalPages or totalPackages directly.
        // If pagination is intended, the backend API needs to be updated to return an object
        // like { packages: [...], totalPages: N, totalPackages: M }.
        // For now, setting these to default values or deriving them if possible.
        setTotalPages(1); // Placeholder, adjust based on actual API or client-side logic
        setTotalPackages(response.data.length); // Placeholder, adjust based on actual API or client-side logic
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch packages');
        setPackages([]);
        setTotalPages(1);
        setTotalPackages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [searchTerm, page, limit, sort]);

  return { packages, loading, error, totalPages, totalPackages };
};

export default usePackages;