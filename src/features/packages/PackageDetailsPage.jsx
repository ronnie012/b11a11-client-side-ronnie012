import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import usePackageDetails from './usePackageDetails';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../../components/shared/LoadingSpinner'; // Assuming this path is correct
import { FaCalendarAlt, FaDollarSign, FaClock, FaMapMarkerAlt, FaUserTie } from "react-icons/fa"; // Changed FaUserCircle to FaUserTie for consistency
import BookingModal from './BookingModal'; // Import the BookingModal
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify'; // Import toast
import axios from 'axios'; // Import axios

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const PackageDetailsPage = () => {
  const { id } = useParams(); // Get the package ID from the URL
  const { packageDetails, loading, error } = usePackageDetails(id);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { user, token } = useAuth(); // Get current user and token

  if (loading) {
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
    // guide_contact_no, // Assuming this is not needed on the public details page
  } = packageDetails;

  const handleOpenModal = () => {
    if (!user) {
      // Optionally, redirect to login or show a message
      toast.info("Please log in to book a package."); // Simple feedback
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
      const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      toast.success('Booking successful!'); // Simple feedback
      console.log('Booking successful', response.data);
    } catch (error) {
      console.error('Booking failed', error.response?.data?.message || error.message);
      toast.error(`Booking failed: ${error.response?.data?.message || error.message}`); // Simple feedback
      throw error; // Re-throw to be caught by modal's error handling
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{tour_name} | TourZen</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center mb-8">{tour_name}</h1>

      {/* Changed to md:grid-cols-3 to give image 1/3 and details 2/3 on medium screens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Image Section */}
        <div className="md:col-span-1">
          <img 
            src={image || "https://via.placeholder.com/600x400.png?text=Tour+Image"} 
            alt={tour_name} 
            className="w-full h-82 object-cover rounded-lg shadow-lg" 
          />
        </div>

        {/* Details Section */}
        {/* Takes 2/3 width on medium screens */}
        <div className="md:col-span-2 bg-base-200 p-6 rounded-lg shadow-md">
          <div className="mb-6 md:mb-0 lg:mb-4 xl:mb-6 pb-4 border-b border-base-300">
            <h2 className="text-2xl font-semibold text-primary xl:mb-4 lg:mb-6 md:mb-0 mb-3">Tour Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{package_details || "No details available."}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6 md:mb-0 lg:mb-6 xl:mb-6">
            <p className="flex items-center text-md"><FaClock className="mr-3 text-accent text-xl" /> <strong>Duration:</strong> <span className="ml-1">{duration || "N/A"}</span></p>
            <p className="flex items-center text-md"><FaDollarSign className="mr-3 text-accent text-xl" /> <strong>Price:</strong> <span className="ml-1">${price?.toFixed(2) || "N/A"}</span></p>
            <p className="flex items-center text-md"><FaCalendarAlt className="mr-3 text-accent text-xl" /> <strong>Departure:</strong> <span className="ml-1">{departure_date ? new Date(departure_date).toLocaleDateString() : "N/A"}</span></p>
            <p className="flex items-center text-md"><FaMapMarkerAlt className="mr-3 text-accent text-xl" /> <strong>From:</strong> <span className="ml-1">{departure_location || "N/A"}</span></p>
            <p className="flex items-center text-md"><FaMapMarkerAlt className="mr-3 text-accent text-xl" /> <strong>To:</strong> <span className="ml-1">{destination || "N/A"}</span></p>
            {/* Guide Information integrated into the grid */}
            <p className="flex items-center text-md">
              {guide_photo ? <img src={guide_photo} alt={guide_name} className="w-6 h-6 rounded-full mr-3 object-cover" /> : <FaUserTie className="mr-3 text-accent text-xl" />}
              <strong>Guide:</strong> <span className="ml-1">{guide_name || "N/A"}</span>
            </p>
          </div>

          <button 
            className="btn btn-success w-3/4 text-lg"
            onClick={handleOpenModal}
          >
            Book Now
          </button>
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
