import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrashAlt, FaDollarSign, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaPlaneDeparture, FaUserTie, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PackageManagementItem = ({ pkg, onDelete, isDeleting }) => {
  const { _id, tour_name, image, price, departure_date, duration, destination, departure_location, guide_name, guide_contact_no, guide_email } = pkg;

  return (
    <div className="card lg:card-side bg-base-200 shadow-xl mb-6">
      <figure className="w-full lg:w-1/4 h-48 lg:h-58 xl:h-60">
        <img 
          src={image || "https://via.placeholder.com/300x200.png?text=Tour+Image"} 
          alt={tour_name} 
          className="w-full h-full object-cover rounded-xl"
        />
      </figure>
      <div className="card-body lg:w-3/4">
        <h2 className="card-title text-xl md:text-2xl">{tour_name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 my-2 text-sm text-base-content/80 dark:text-base-content/70">
            <p className="flex items-center"><FaUserTie className="mr-2 text-accent" /> <span className="font-bold mr-1">Guide:</span> {guide_name || 'N/A'}</p>
            <p className="flex items-center"><FaDollarSign className="mr-2 text-accent" /> <span className="font-bold mr-1">Price:</span> $ {price?.toFixed(0) || 'N/A'}</p>
            <p className="flex items-center"><FaCalendarAlt className="mr-2 text-accent" /> <span className="font-bold mr-1">Departure Date:</span> {departure_date ? new Date(departure_date).toLocaleDateString() : 'N/A'}</p>
            <p className="flex items-center"><FaClock className="mr-2 text-accent" /> <span className="font-bold mr-1">Duration:</span> {duration || 'N/A'}</p>
            <p className="flex items-center col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1"><FaPlaneDeparture className="mr-2 text-accent" /> <span className="font-bold mr-1">Departs from:</span> {departure_location || 'N/A'}</p>
            <p className="flex items-center col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1"><FaMapMarkerAlt className="mr-2 text-accent" /> <span className="font-bold mr-1">Destination:</span> {destination || 'N/A'}</p>
            {guide_contact_no && <p className="flex items-center"><FaPhone className="mr-2 text-accent" /> <span className="font-bold mr-1">Contact:</span> {guide_contact_no}</p>}
            {guide_email && <p className="flex items-center"><FaEnvelope className="mr-2 text-accent" /> <span className="font-bold mr-1">Email:</span> {guide_email}</p>}
        </div>
        <div className="card-actions justify-end items-center mt-4">
          {/* The Link for Update will likely go to a pre-filled form page. 
              For now, it's a placeholder. You might need an EditPackagePage. */}
          <Link to={`/update-package/${_id}`} className="btn btn-sm btn-info">
            <FaEdit className="mr-1" /> Update
          </Link>
          <button 
            onClick={() => onDelete(_id, tour_name)} 
            className={`btn btn-sm btn-error ${isDeleting ? 'loading' : ''}`}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : <><FaTrashAlt className="mr-1" /> Delete</>}
          </button>
        </div>
      </div>
    </div>
  );
};

PackageManagementItem.propTypes = {
  pkg: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    tour_name: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.number,
    departure_date: PropTypes.string,
    duration: PropTypes.string,
    destination: PropTypes.string,
    departure_location: PropTypes.string,
    guide_name: PropTypes.string,
    guide_contact_no: PropTypes.string,
    guide_email: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool,
};

export default PackageManagementItem;