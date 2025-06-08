import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | TourZen</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h- text-center px-4 bg-base-300 rounded-4xl">
        {/* You can replace this with a relevant 404 image */}
        <img 
          src="https://i.imgur.com/qIufhof.png" // Example 404 image (lost traveler/compass)
          alt="Page Not Found" 
          className="w-64 h-44 mb-"
        />
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-orange-500 mb-6">Oops! Page Not Found.</h2>
        <p className="text-lg text-base-content mb-8 max-w-">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-success btn-lg rounded-2xl mb-8">
          Go Back to Homepage
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;