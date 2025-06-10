import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaClock,
  FaUserCircle,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const PackageCard = ({ packageData, showGuideEmail = true, showGuideContactNo = true }) => {
  const {
    _id,
    tour_name,
    image,
    guide_name,
    guide_photo,
    duration,
    price,
    departure_date,
    guide_contact_no, // Add this
    guide_email,      // Add this
  } = packageData;

  return (
    <div className="card bg-base-200 shadow-xl hover:shadow-2xl hover:scale-110 ring-2 ring-green-400 hover:ring-4 hover:ring-green-500 hover:bg-orange-400  transition-all duration-100 ease-in-out">
      <figure className="h-56 overflow-hidden">
        <img
          src={
            image || "https://via.placeholder.com/400x225.png?text=Tour+Image"
          }
          alt={tour_name}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-4 flex flex-col">
        {" "}
        {/* Added flex flex-col for better button positioning control */}
        <h2
          className="card-title text-2xl  font-bold truncate"
          title={tour_name}
        >
          {tour_name}
        </h2>
        <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
          {guide_photo ? (
            <img
              src={guide_photo}
              alt={guide_name}
              className="w-10 rounded-full mr-2 object-cover"
            />
          ) : (
            <FaUserCircle className="w-6 h-6 mr-2 text-gray-400" />
          )}
          <span className="text-lg text-base-content/80 dark:text-base-content/70 font-semibold">{guide_name || "N/A"}</span>
        </div>
        {/* CloThis container will hold details and button, allowing them to be side-by-side at the bottom */}
        {/* flex-grow pushes this block to the bottom of the card-body if content above is short */}
        <div className="mt-3 flex flex-col flex-grow justify-end">
          <div className="flex items-end justify-between">
            {" "}
            {/* Aligns details and button on the same line, items-end aligns their bottoms */}
            <div className="space-y-2 text-lg text-base-content/80 dark:text-base-content/70 font-bold">
              {" "}
              {/* Details on the left */}
              <p className="flex items-center">
                <FaClock className="mr-2 text-blue-400 text-base" /> Duration: {duration || "N/A"}
              </p>
              
              <p className="flex items-center">
                <FaCalendarAlt className="mr-2 text-red-500 text-base" />{"Departure: "}
                {departure_date
                  ? new Date(departure_date).toLocaleDateString()
                  : "N/A"}
              </p> 
              <p className="flex items-center">
                <FaDollarSign className="mr-2 text-success text-lg" />
                Price: {price?.toFixed(0) || "N/A"}
              </p>
              {showGuideContactNo && guide_contact_no && (
                <p className="flex items-center text-xs"><FaPhone className="mr-2 text-gray-500" /> {guide_contact_no}</p>
              )}
              {showGuideEmail && guide_email && (
                <p className="flex items-center text-xs"><FaEnvelope className="mr-2 text-gray-500" /> {guide_email}</p>
              )}

            </div>
            {/* Button on the right */}
            <div className="card-actions">
              <Link to={`/package/${_id}`} className="btn btn-outline btn-success hover:text-orange-500 hover:border-orange-500 hover:bg-neutral btn-sm ">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PackageCard.propTypes = {
  packageData: PropTypes.object.isRequired,
  showGuideEmail: PropTypes.bool,
  showGuideContactNo: PropTypes.bool,
};

export default PackageCard;
