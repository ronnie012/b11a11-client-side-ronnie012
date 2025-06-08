import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const usePackageDetails = (packageId) => {
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!packageId) {
      setError('Package ID is required.');
      setLoading(false);
      return;
    }

    const fetchPackageDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/packages/${packageId}`);
        setPackageDetails(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch package details');
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [packageId]); // Re-run effect if packageId changes

  return { packageDetails, loading, error };
};

export default usePackageDetails;