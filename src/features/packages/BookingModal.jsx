import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form'; // Import useForm
import { useAuth } from '../../contexts/AuthContext'; // To get logged-in user details

const BookingModal = ({ packageDetails, isOpen, onClose, onBookingSubmit }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors: formErrors }, reset } = useForm({
    defaultValues: {
      notes: ''
    }
  });

  if (!isOpen || !packageDetails) return null;

  const onSubmit = async (formData) => { // Renamed to onSubmit, receives formData from react-hook-form
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
      status: 'Pending', // Default status
      notes: formData.notes, // Get notes from formData
      bookingDate: Date.now(), // Automatically set the current timestamp as a number
    };

    try {
      // onBookingSubmit will be a function passed from PackageDetailsPage
      // that handles the actual API call to the backend.
      await onBookingSubmit(bookingData);
      // Optionally, show a success message or redirect
      reset(); // Reset form fields (including notes)
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
          onClick={() => {
            reset(); // Also reset form on manual close
            onClose();
          }}
          className="btn btn-sm btn-circle absolute right-2 top-2"
          disabled={loading}
        >
          ✕
        </button>
        <h3 className="text-3xl text-success text-center font-bold mb-4">Book Now:<br/> {packageDetails.tour_name}</h3>
        <form onSubmit={handleSubmit(onSubmit)}> {/* Use handleSubmit(onSubmit) */}
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
          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Special Note (Optional):</span></label>
            <textarea
              className={`textarea textarea-bordered h-24 w-full ${formErrors.notes ? 'textarea-error' : ''}`}
              placeholder="Any special requests or notes..."
              {...register("notes")} // Register the notes field
            ></textarea>
            {formErrors.notes && <span className="text-error text-xs mt-1">{formErrors.notes.message}</span>}
          </div>
          
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="modal-action mt-6">
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : 'Book Now'}
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
