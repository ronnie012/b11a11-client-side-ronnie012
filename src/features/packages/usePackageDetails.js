import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const usePackageDetails = (packageId) => {
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackageDetails = useCallback(async () => {
    if (!packageId) {
      setError('Package ID is required.');
      setLoading(false);
      setPackageDetails(null); // Ensure details are cleared if no ID
      return;
    }

    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const response = await axios.get(`${API_BASE_URL}/packages/${packageId}`);
      setPackageDetails(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch package details');
      setPackageDetails(null); // Clear details on error
    } finally {
      setLoading(false);
    }
  }, [packageId]); // Dependency: re-create if packageId changes

  useEffect(() => {
    fetchPackageDetails();
  }, [fetchPackageDetails]); // Re-run effect if fetchPackageDetails (due to packageId change)

  return { packageDetails, loading, error, refetch: fetchPackageDetails };
};

export default usePackageDetails;