import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrashAlt, FaDollarSign, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaPlaneDeparture, FaUserTie, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PackageManagementItem = ({ pkg, onDelete, isDeleting }) => {
  const { _id, tour_name, image, price, departure_date, duration, destination, departure_location, guide_name, guide_contact_no, guide_email } = pkg;

  return (
    <div className="card lg:card-side w-full bg-base-200 shadow-xl mb-8 rounded-2xl hover:shadow-2xl hover:scale-102 ring-1 ring-green-500 hover:ring-1 hover:ring-orange-500 hover:bg-orange-  transition-all duration-1 ease-in-out hover:cursor-pointer">
      <figure className="w-full lg:w-1/4 h-48 lg:h-58 xl:h-60">
        <img 
          src={image || "https://via.placeholder.com/300x200.png?text=Tour+Image"} 
          alt={tour_name} 
          className="w-full h-full object-cover rounded-xl"
        />
      </figure>
      <div className="card-body lg:w-3/4">
        <h2 className="card-title xl:text-2xl lg:text-2xl md:text-2xl text-lg my-2">{tour_name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-4  text-sm text-base-content/80 dark:text-base-content/70">
            <p className="flex items-center text-sm"><FaUserTie className="mr-2 text-accent" /> <span className="font-bold mr-1">Guide:</span> {guide_name || 'N/A'}</p>
            <p className="flex items-center text-sm"><FaDollarSign className="mr-2 text-accent" /> <span className="font-bold mr-1">Price:</span> $ {price?.toFixed(0) || 'N/A'}</p>
            <p className="flex items-center text-sm"><FaCalendarAlt className="mr-2 text-accent" /> <span className="font-bold mr-1">Departure Date:</span> {departure_date ? new Date(departure_date).toLocaleDateString() : 'N/A'}</p>
            <p className="flex items-center text-sm"><FaClock className="mr-2 text-accent" /> <span className="font-bold mr-1">Duration:</span> {duration || 'N/A'}</p>
            <p className="flex items-center text-sm"><FaPlaneDeparture className="mr-2 text-accent" /> <span className="font-bold mr-1">Departs from:</span> {departure_location || 'N/A'}</p>
            <p className="flex items-center text-sm col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1"><FaMapMarkerAlt className="mr-2 text-accent" /> <span className="font-bold mr-1">Destination:</span> {destination || 'N/A'}</p>
            {guide_contact_no && <p className="flex items-center text-sm"><FaPhone className="mr-2 text-accent" /> <span className="font-bold mr-1">Contact:</span> {guide_contact_no}</p>}
            {guide_email && <p className="flex items-center text-sm"><FaEnvelope className="mr-2 text-accent" /> <span className="font-bold mr-4">Email:</span> {guide_email}</p>}
        </div>
        <div className="card-actions justify-end items-center mt-0">
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