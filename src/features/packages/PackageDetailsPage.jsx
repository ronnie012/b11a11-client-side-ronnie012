import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePackageDetails from './usePackageDetails';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../../components/shared/LoadingSpinner'; // Assuming this path is correct
import { FaCalendarAlt, FaDollarSign, FaClock, FaMapMarkerAlt, FaUserTie, FaPhone, FaUsers } from "react-icons/fa"; // Added FaPhone, FaUsers
import BookingModal from './BookingModal'; // Import the BookingModal
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify'; // Import toast
import useUserBookings from '../bookings/useUserBookings'; // Import the new hook
import axios from 'axios'; // Import axios

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const PackageDetailsPage = () => {
  const { id } = useParams(); // Get the package ID from the URL
  const { packageDetails, loading, error, refetch: refetchPackageDetails } = usePackageDetails(id); // Destructure refetch
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { user, token } = useAuth(); // Get current user and token
  const { bookings: userBookings, loading: bookingsLoading, refetchUserBookings } = useUserBookings();
  const [hasUserBookedThisPackage, setHasUserBookedThisPackage] = useState(false);

  useEffect(() => {
    if (packageDetails && userBookings.length > 0) {
      const alreadyBooked = userBookings.some(booking => booking.packageId === packageDetails._id);
      setHasUserBookedThisPackage(alreadyBooked);
    } else {
      setHasUserBookedThisPackage(false); // Reset if no bookings or package details
    }
  }, [packageDetails, userBookings]);

  if (loading || bookingsLoading) { // Consider bookings loading state as well
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Error loading package details: {error}</p>
      </div>
    );
  }

  if (!packageDetails) {
    return <div className="text-center py-10">Package not found.</div>;
  }

  const {
    tour_name,
    image,
    guide_name,
    guide_photo,
    duration,
    price,
    departure_date,
    departure_location,
    destination,
    package_details,
    guide_contact_no, 
    guide_email, // This should be available from your package data
    booking_count, // Assuming this field will be available
  } = packageDetails;

  const handleOpenModal = () => {
    if (!user) {
      // Optionally, redirect to login or show a message
      toast.info("Please log in to book a package."); // Simple feedback
      return;
    }
    // Check if the logged-in user is the guide for this package
    if (user.email === guide_email) {
      toast.info("You cannot book a package you are guiding.");
      return;
    }
    // Check if already booked (client-side check for UX)
    if (hasUserBookedThisPackage) {
      toast.info("You have already booked this package.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBookingSubmit = async (bookingData) => {
    if (!user || !token) { // Ensure user and token exist
        toast.error("Authentication error. Please log in again.");
        throw new Error("User not authenticated or token missing.");
    }
    try {
      // const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData, { 
      await axios.post(`${API_BASE_URL}/bookings`, bookingData, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      toast.success('Booking successful!'); // Simple feedback
      refetchUserBookings(); // Re-fetch bookings to update the button state
      refetchPackageDetails(); // Re-fetch package details to update booking count
      // console.log('Booking successful', response.data);
    } catch (error) {
      console.error('Booking failed', error.response?.data?.message || error.message);
      toast.error(`Booking failed: ${error.response?.data?.message || error.message}`); // Simple feedback
      throw error; // Re-throw to be caught by modal's error handling
    }
  };

  return (
    <div className="container mx-auto px-4 py-0">
      <Helmet>
        <title>{tour_name} | TourZen</title>
      </Helmet>

      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-success mb-6 md:mb-8">
        {tour_name}
      </h1>

      {/* Image Section - Full Width */}
      <div className="mb-6 md:mb-8">
        <img 
          src={image || "https://via.placeholder.com/1200x600.png?text=Tour+Image"} 
          alt={tour_name} 
          className="w-full h-auto max-h-[400px] md:max-h-[550px] object-cover rounded-2xl shadow-xl" 
        />
      </div>

      {/* Details Section - Below Image with distinct background */}
      <div className="bg-base-200 p-6 md:p-8 rounded-2xl shadow-xl">
        {/* Tour Overview */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-success mb-3">Full Description</h2>
          <p className="text-base-content/90 dark:text-base-content/80 leading-relaxed">{package_details || "No details available."}</p>
        </div>

        {/* Key Details & Booking Button Grid */}
        {/* Removed the outer grid, Key Details will flow, and button will be at the end */}
        <div className="space-y-6"> {/* Added a wrapper div with spacing */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-success mb-3">Key Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-base">
              <p className="flex items-center"><FaCalendarAlt className="mr-2 text-accent text-lg" /> <strong>Departure Date:</strong> <span className="ml-1">{departure_date ? new Date(departure_date).toLocaleDateString() : "N/A"}</span></p>
              <p className="flex items-center"><FaClock className="mr-2 text-accent text-lg" /> <strong>Duration:</strong> <span className="ml-1">{duration || "N/A"}</span></p>
              <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-accent text-lg" /> <strong>Departure Location:</strong> <span className="ml-1">{departure_location || "N/A"}</span></p>
              <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-accent text-lg" /> <strong>Destination:</strong> <span className="ml-1">{destination || "N/A"}</span></p>
              <p className="flex items-center"><FaDollarSign className="mr-2 text-accent text-lg" /> <strong>Price:</strong> <span className="ml-1">$ {price?.toFixed(0) || "N/A"}</span></p>
              <p className="flex items-center">
                {guide_photo ? <img src={guide_photo} alt={guide_name} className="w-6 h-6 rounded-full mr-2 object-cover" /> : <FaUserTie className="mr-2 text-accent text-lg" />}
                <strong>Guide's Name:</strong> <span className="ml-1">{guide_name || "N/A"}</span>
              </p>
              <p className="flex items-center"><FaUsers className="mr-2 text-accent text-lg" /> <strong>Booking Count:</strong> <span className="ml-1">{booking_count || 0} Time(s)</span></p>
              {guide_contact_no && (
                <p className="flex items-center"><FaPhone className="mr-2 text-accent text-lg" /> <strong>Contact:</strong> <span className="ml-1">{guide_contact_no}</span></p>
              )}
            </div>
          </div>

          {/* Booking Button - now part of the main flow */}
          <div className="flex justify-center md:justify-end"> {/* Aligns button to the right on medium screens and up */}
            <button 
              className="btn btn-success w-full sm:w-auto text-lg"
              onClick={handleOpenModal}
              disabled={user?.email === guide_email || hasUserBookedThisPackage} // Disable if guide or already booked
            >
              {user?.email === guide_email ? "You can't book your own package" : (hasUserBookedThisPackage ? "Already Booked" : "Book Now")}
            </button>
          </div>
        </div>
      </div>
      {packageDetails && (
        <BookingModal
          packageDetails={packageDetails}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onBookingSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};
export default PackageDetailsPage;
