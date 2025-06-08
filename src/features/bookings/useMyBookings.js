import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'; // To get the user's token

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const useMyBookings = () => {
  const { user, token, loading: authLoading } = useAuth(); // Get user and token, and auth loading state
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Indicates loading state for bookings
  const [error, setError] = useState(null);

  useEffect(() => {
    const attemptFetchBookings = async () => {
      if (authLoading) {
        setLoading(true); // If authentication is in progress, bookings are effectively loading.
        setBookings([]);  // Clear stale bookings.
        setError(null);
        return;
      }

      if (user && token) {
        setLoading(true);
        setError(null); // Clear previous errors before a new fetch attempt.
        try {
          const response = await axios.get(`${API_BASE_URL}/bookings/my-bookings`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setBookings(response.data);
        } catch (err) {
          setError(err.response?.data?.message || err.message || 'Failed to fetch your bookings');
          setBookings([]); // Clear bookings on error to avoid showing stale data.
        } finally {
          setLoading(false);
        }
      } else {
        // Not authLoading, and no user/token (i.e., logged out or auth failed)
        setBookings([]);
        setLoading(false);
        setError(null); // Clear any errors from previous logged-in state.
      }
    };

    attemptFetchBookings();
  }, [user, token, authLoading]); // Effect runs when auth state changes.

  // Refetch function for manual refresh
  const refetch = React.useCallback(async () => {
    if (user && token && !authLoading) { // Only refetch if authenticated and auth is not loading
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/bookings/my-bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to refetch bookings');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }
  }, [user, token, authLoading]);

  return { bookings, loading, error, refetch };
};

export default useMyBookings;
