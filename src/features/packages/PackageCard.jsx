import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaClock,
  FaUserCircle,
} from "react-icons/fa";

const PackageCard = ({ packageData }) => {
  const {
    _id,
    tour_name,
    image,
    guide_name,
    guide_photo,
    duration,
    price,
    departure_date,
  } = packageData;

  return (
    <div className="card bg-base-100 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:ring-2 hover:ring-success hover:ring-opacity-60">
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
          className="card-title text-2xl text-success font-bold truncate"
          title={tour_name}
        >
          {tour_name}
        </h2>
        <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
          {guide_photo ? (
            <img
              src={guide_photo}
              alt={guide_name}
              className="w-6 h-6 rounded-full mr-2 object-cover"
            />
          ) : (
            <FaUserCircle className="w-6 h-6 mr-2 text-gray-400" />
          )}
          <span>{guide_name || "N/A"}</span>
        </div>
        {/* CloThis container will hold details and button, allowing them to be side-by-side at the bottom */}
        {/* flex-grow pushes this block to the bottom of the card-body if content above is short */}
        <div className="mt-3 flex flex-col flex-grow justify-end">
          <div className="flex items-end justify-between">
            {" "}
            {/* Aligns details and button on the same line, items-end aligns their bottoms */}
            <div className="space-y-2 text-sm font-bold">
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

            </div>
            {/* Button on the right */}
            <div className="card-actions">
              <Link to={`/package/${_id}`} className="btn btn-success btn-outline rounded-xl hover:bg-neutral hover:text-orange-500   hover:border-orange-500  xl:btn-md lg:btn-md btn-sm">
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
};

export default PackageCard;
