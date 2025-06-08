import React from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt, FaMapMarkerAlt, FaStickyNote, FaInfoCircle, FaDollarSign, FaUserTie } from 'react-icons/fa'; // Ensure FaUserTie is imported

const BookingItem = ({ booking, onConfirmBooking }) => {
  const {
    packageName,
    guideName,
    // guide_contact_no, // Not directly in booking, would need to fetch from package or store in booking
    packageImage, // Expecting this from the booking object
    selectedTourDate,
    departure_location, // Expecting this
    destination, // Expecting this
    notes,
    status,
    price, // Assuming price is stored with the booking
    _id: bookingId,
  } = booking;

  const formattedTourDate = selectedTourDate ? new Date(selectedTourDate).toLocaleDateString() : 'N/A';

  return (
    <div className="card bg-base-200 shadow-xl mb-6">
      <div className="card-body p-4 md:p-6">
        <div className="flex flex-col md:flex-row xl:gap-0 md:gap-6"> {/* Standardized gap for medium screens and up */}
          {/* Image Column */}
          <div className="w-full md:w-1/3 flex-shrink-0 mb-4 md:mb-0"> {/* Adjusted width back to 1/3 */}
            <img src={packageImage || "https://via.placeholder.com/300x200.png?text=Tour+Image"} alt={packageName} className="w-72 h-48 xl:h-44 lg:h-62 md:h-64 object-cover rounded-lg shadow" /> {/* Responsive image height */}
          </div>
          {/* Details & Actions Column */}
          <div className="w-full md:w-2/3 flex flex-col">
            <h3 className="card-title text-xl md:text-2xl mb-4">{packageName}</h3> {/* Slightly more bottom margin for title */}
            {/* Grid for 6 info items: Guide, Date, Price, From, To, Status+Button */}
            {/* Using a flex container for details and status/button to allow notes below */}
            <div className="flex flex-col flex-grow"> {/* Main details grid - adjusted gaps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4 sm:gap-x-3 lg:gap-x-4 mb-4 text-sm md:text-base">
                <p className="flex items-center"><FaUserTie className="mr-2 text-primary text-lg" /><strong>Guide:</strong> <span className="ml-1">{guideName || 'N/A'}</span></p>
                <p className="flex items-center"><FaCalendarAlt className="mr-2 text-primary text-lg" /><strong>Tour Date:</strong> <span className="ml-1">{formattedTourDate}</span></p>
                <p className="flex items-center"><FaDollarSign className="mr-2 text-primary text-lg" /><strong>Price:</strong> <span className="ml-1">${price?.toFixed(2) || 'N/A'}</span></p>
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-primary text-lg" /><strong>From:</strong> <span className="ml-1">{departure_location || 'N/A'}</span></p>
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-primary text-lg" /><strong>To:</strong> <span className="ml-1">{destination || 'N/A'}</span></p>
                {/* Status and Confirm button combined as the 6th grid item - adjusted sm justification */}
                <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row sm:justify-start sm:items-center md:items-start xl:items-center gap-1 sm:gap-2 lg:col-span-1">
                  <p className="flex items-center whitespace-nowrap"><FaInfoCircle className="mr-2 text-primary text-lg" /><strong>Status:</strong></p>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${status === 'Completed' ? 'badge-success' : status === 'Accepted' ? 'badge-info' : status === 'In Review' ? 'badge-warning' : 'badge-error'} md:text-xs`}>{status}</span>
                  {status === 'In Review' && (
                    <button
                      className="btn btn-xs sm:btn-sm btn-success" // Responsive button size
                      onClick={() => onConfirmBooking(bookingId)}
                    >
                      Confirm
                    </button>
                  )}
                  </div>
                </div>
              </div>
              
              {/* Notes below the main grid */}
              {notes && (
                <p className="flex items-start text-sm md:text-base mt-4 md:mt-0 pt-3 border-t border-base-300"> {/* Reduced top margin on md screens */}
                  <FaStickyNote className="mr-2 text-primary text-lg mt-1 flex-shrink-0" />
                  <strong>Special Note:</strong> <span className="ml-1 break-all">{notes}</span> {/* Removed extra colon */}
                </p>
              )}
            </div> {/* End of flex-grow container */}
          </div> {/* End of Details & Actions Column */}
        </div> {/* End of flex-col md:flex-row gap */}
      </div>
    </div>
  );
};

BookingItem.propTypes = {
  booking: PropTypes.object.isRequired,
  onConfirmBooking: PropTypes.func.isRequired,
};

export default BookingItem;
