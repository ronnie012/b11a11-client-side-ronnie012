import React from 'react';
import { Helmet } from 'react-helmet-async';
import useMyBookings from './useMyBookings'; // Import the hook
import LoadingSpinner from '../../components/shared/LoadingSpinner'; // Assuming this path is correct
import BookingItem from './BookingItem'; // Import the BookingItem component
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios
import { useAuth } from '../../contexts/AuthContext'; // To get the token
import { Link } from 'react-router-dom'; // Import Link for the button

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const MyBookingsPage = () => {
  // Renaming 'bookings' from hook to 'initialBookings' to avoid conflict with state
  const { bookings: initialBookings, loading, error, refetch: refetchBookings } = useMyBookings(); 
  const { token } = useAuth(); // Get the token for API calls
  const [bookings, setBookings] = React.useState([]); // Local state for bookings

  React.useEffect(() => {
    if (initialBookings) {
      setBookings(initialBookings);
    }
  }, [initialBookings]);

  const handleConfirmBooking = async (bookingId) => {
    if (!token) {
      toast.error("Authentication error. Please log in again.");
      return;
    }
    try {
      await axios.patch(`${API_BASE_URL}/bookings/${bookingId}/status`, 
        { status: 'Completed' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Booking confirmed successfully!');
      // Refetch bookings to get the updated list from the server
      refetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to confirm booking.');
      console.error('Error confirming booking:', err);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Error loading your bookings: {error}</p>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-5xl font-semibold text-gray-700 dark:text-gray-300 mb-8">You have no bookings yet.</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't booked any amazing adventures with us. <br />Why not explore some of our curated packages?</p>
        <Link to="/all-packages" className="btn btn-success">
          Explore Packages
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0 py-8">
      <Helmet><title>My Bookings | TourZen</title></Helmet>
      <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>
      <div className="space-y-4"> {/* Add some space between booking items */}
        {bookings.map(booking => (
          <BookingItem key={booking._id} booking={booking} onConfirmBooking={handleConfirmBooking} />
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;
