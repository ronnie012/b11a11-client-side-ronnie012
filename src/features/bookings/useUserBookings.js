import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'; // Adjust path as needed

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const useUserBookings = () => {
  const { user, token, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserBookings = useCallback(async () => {
    if (authLoading) {
      setLoading(true); // Keep loading if auth state is still being determined
      return;
    }

    if (!user || !token) {
      setBookings([]);
      setLoading(false);
      setError(null); // No error if user is not logged in, just no bookings
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/my-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch your bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [user, token, authLoading]);

  useEffect(() => {
    fetchUserBookings();
  }, [fetchUserBookings]);

  return { bookings, loading: loading || authLoading, error, refetchUserBookings: fetchUserBookings };
};

export default useUserBookings;