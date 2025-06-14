import React from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt, FaMapMarkerAlt, FaStickyNote, FaInfoCircle, FaDollarSign, FaUserTie, FaRegCalendarCheck, FaPhone } from 'react-icons/fa';

const BookingItem = ({ booking, onConfirmBooking }) => {
  const {
    packageName,
    guideName,
    guide_contact_no,
    packageImage, // Expecting this from the booking object
    selectedTourDate,
    departure_location, // Expecting this
    destination, // Expecting this
    notes,
    status,
    price, // Assuming price is stored with the booking
    _id: bookingId,
    bookingDate, // This is the timestamp of when the booking was made
  } = booking;

  const formattedTourDate = selectedTourDate ? new Date(selectedTourDate).toLocaleDateString() : 'N/A';
  const formattedBookingCreationDate = bookingDate ? new Date(bookingDate).toLocaleDateString() : 'N/A';

  return (
    <div className="card lg:w-full bg-base-200 shadow-xl mb-8 rounded-2xl hover:shadow-2xl hover:scale-105 ring-2 ring-green-500 hover:ring-4 hover:ring-green-500 hover:bg-orange-400  transition-all duration-1 ease-in-out hover:cursor-pointer">
      <div className="card-body lg:p-0 p-6 md:p-6">
        <div className="flex flex-col md:flex-row xl:gap-1 md:gap-6"> {/* Standardized gap for medium screens and up */}
          {/* Image Column */}
          <div className="lg:w-1/4 w-full md:w-1/3 flex-shrink-0 mb-4 md:mb-0"> {/* Adjusted width back to 1/3 */}
            <img src={packageImage || "https://via.placeholder.com/300x200.png?text=Tour+Image"} alt={packageName} className="w-72 h-48 xl:h-64 lg:h-78 md:h-90 sm:h-64 object-cover rounded-2xl shadow" /> {/* Responsive image height */}
          </div>
          {/* Details & Actions Column */}
          <div className="lg:w-3/4 w-full md:w-2/3 flex flex-col">
            <h1 className="card-title sm:text-xl md:text-2xl lg:text-4xl my-5">{packageName}</h1> {/* Slightly more bottom margin for title */}
            {/* Grid for 6 info items: Guide, Date, Price, From, To, Status+Button */}
            {/* Using a flex container for details and status/button to allow notes below */}
            <div className="flex flex-col flex-grow"> {/* Main details grid - adjusted gaps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 lg:gap-y-1 gap-x-4 sm:gap-x-3 lg:gap-x-4 mb-4 lg:mb-2 text-sm md:text-base">
                <p className="flex items-center"><FaUserTie className="mr-2 text-success text-lg" /><strong>Guide:</strong> <span className="ml-1">{guideName || 'N/A'}</span></p>
                {guide_contact_no && (
                  <p className="flex items-center"><FaPhone className="mr-2 text-success text-lg" /><strong>Contact:</strong> <span className="ml-1">{guide_contact_no}</span></p>
                )}
                <p className="flex items-center"><FaDollarSign className="mr-2 text-success text-lg" /><strong>Price:</strong> <span className="ml-1">$ {price?.toFixed(0) || 'N/A'}</span></p>
                <p className="flex items-center"><FaRegCalendarCheck className="mr-2 text-success text-lg" /><strong>Booking Date:</strong> <span className="ml-1">{formattedBookingCreationDate}</span></p>
                <p className="flex items-center"><FaCalendarAlt className="mr-2 text-success text-lg" /><strong>Departure Date:</strong> <span className="ml-1">{formattedTourDate}</span></p>
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-success text-lg" /><strong>Departure location:</strong> <span className="ml-1">{departure_location || 'N/A'}</span></p>
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-success text-lg" /><strong>Destination:</strong> <span className="ml-1">{destination || 'N/A'}</span></p>
                {/* Status and Confirm button combined as the 6th grid item - adjusted sm justification */}
                <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row sm:justify-start sm:items-center md:items-start xl:items-center gap-1 sm:gap-2 lg:col-span-1">
                  <p className="flex items-center whitespace-nowrap"><FaInfoCircle className="mr-2 text-success text-lg" /><strong>Status:</strong></p>
                  <div className="flex items-center gap-2">
                    {/* Updated badge logic for "Pending" */}
                    <span className={`badge ${status === 'Completed' ? 'badge-success' : status === 'Accepted' ? 'badge-info' : status === 'Pending' ? 'badge-warning' : 'badge-error'} md:text-xs`}>
                      {status}
                    </span>
                    {/* Conditional button rendering based on status */}
                    {status === 'Pending' && (
                      <button
                        className="btn btn-xs rounded-lg sm:btn-sm btn-success" // Responsive button size
                        onClick={() => onConfirmBooking(bookingId)}
                      >
                        Confirm
                      </button>
                    )}
                    {status === 'Completed' && (
                      <button
                        className="btn  rounded-lg btn-sm  lg:text-lg xl:text-lg text-gray-500 btn-success" // Keeps similar styling, disabled state will alter appearance
                        disabled
                      >
                        Already Confirmed
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Notes below the main grid - always visible */}
              <p className="flex items-start text-sm md:text-base mt-4 md:mt-0 pt-2 border-t border-base-300 mr-5"> {/* Reduced top margin on md screens */}
                <FaStickyNote className="mr-2 text-orange-500 text-lg mt-1 flex-shrink-0" />
                <strong>Special Note: </strong> <span className="ml-4 break-all">{notes || "No special note added."}</span>
              </p>
            </div> {/* End of flex-grow container */}
          </div> {/* End of Details & Actions Column */}
        </div> {/* End of flex-col md:flex-row gap */}
      </div>
    </div>
  );
};

BookingItem.propTypes = {
  booking: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    packageName: PropTypes.string,
    guideName: PropTypes.string,
    packageImage: PropTypes.string,
    selectedTourDate: PropTypes.string, // Or Date
    departure_location: PropTypes.string,
    destination: PropTypes.string,
    notes: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
    bookingDate: PropTypes.number, // Timestamp
    guide_contact_no: PropTypes.string,
  }).isRequired,
  onConfirmBooking: PropTypes.func.isRequired,
};

export default BookingItem;
