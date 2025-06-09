import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext'; // To get logged-in user details

const BookingModal = ({ packageDetails, isOpen, onClose, onBookingSubmit }) => {
  const { user } = useAuth(); 
  // const [tourDate, setTourDate] = useState(packageDetails?.departure_date || ''); // Removed as per new requirement
  const [notes, setNotes] = useState(''); // State for special notes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !packageDetails) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user) {
      setError("You must be logged in to make a booking.");
      setLoading(false);
      return;
    }

    const bookingData = {
      packageName: packageDetails.tour_name,
      packageId: packageDetails._id,
      price: packageDetails.price,
      touristName: user.displayName || user.email, // Prefer displayName
      touristEmail: user.email,
      touristImage: user.photoURL || '',
      selectedTourDate: packageDetails.departure_date, // Use the package's departure date
      guideName: packageDetails.guide_name, // Assuming guide_name is in packageDetails
      status: 'In Review', // Default status
      notes: notes, // Add notes to booking data
      bookingDate: Date.now(), // Automatically set the current timestamp as a number
    };

    try {
      // onBookingSubmit will be a function passed from PackageDetailsPage
      // that handles the actual API call to the backend.
      await onBookingSubmit(bookingData);
      // Optionally, show a success message or redirect
      setNotes(''); // Clear notes field on successful submission
      onClose(); // Close modal on successful submission
    } catch (err) {
      setError(err.message || 'Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box relative">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2"
          disabled={loading}
        >
          ✕
        </button>
        <h3 className="text-3xl text-center font-bold mb-4">Book Now:<br/> {packageDetails.tour_name}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label"><span className="label-text mr-7">Package Price:</span></label>
            <input type="text" value={`$ ${packageDetails.price?.toFixed(0)}`} className="input input-bordered" readOnly />
          </div>
          <div className="form-control mb-4">
            <label className="label"><span className="label-text mr-13">Your Name:</span></label>
            <input type="text" value={user?.displayName || user?.email || ''} className="input input-bordered" readOnly />
          </div>
          <div className="form-control mb-4">
            <label className="label"><span className="label-text mr-14">Your Email:</span></label>
            <input type="text" value={user?.email || ''} className="input input-bordered" readOnly />
          </div>
          <div className="form-control mb-4">
            <label className="label"><span className="label-text mr-9">Booking Date:</span></label>
            <input type="text" value={new Date().toLocaleString()} className="input input-bordered" readOnly />
          </div>
          {/* <div className="form-control mb-4">
            <label className="label"><span className="label-text mr-2">Select Tour Date:</span></label>
            <input type="date" value={tourDate ? new Date(tourDate).toISOString().split('T')[0] : ''} onChange={(e) => setTourDate(e.target.value)} className="input input-bordered" required />
          </div> */}
          <div className="form-control mb-4"> {/* Changed mt-4 to mb-4 for consistency */}
            <label className="label"><span className="label-text">Special Note (Optional):</span></label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="textarea textarea-bordered h-24 w-full" placeholder="Any special requests or notes..."></textarea>
          </div>
          
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="modal-action mt-6">
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

BookingModal.propTypes = {
  packageDetails: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onBookingSubmit: PropTypes.func.isRequired,
};

export default BookingModal;