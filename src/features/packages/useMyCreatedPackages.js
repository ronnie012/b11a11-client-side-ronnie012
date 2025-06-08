import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const useMyCreatedPackages = () => {
  const { user, token, loading: authLoading } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = useCallback(async () => {
    if (authLoading) {
      setLoading(true);
      setPackages([]);
      setError(null);
      return;
    }

    if (user && token) {
      setLoading(true);
      setError(null);
      try {
        // Assuming an endpoint like /api/v1/packages/my-packages to get packages created by the logged-in user
        const response = await axios.get(`${API_BASE_URL}/packages/my-packages`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPackages(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch your packages');
        setPackages([]);
      } finally {
        setLoading(false);
      }
    } else {
      setPackages([]);
      setLoading(false);
      setError(null);
    }
  }, [user, token, authLoading]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return { packages, loading, error, refetch: fetchPackages };
};

export default useMyCreatedPackages;