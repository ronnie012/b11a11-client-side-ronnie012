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
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHltdWJjM2p2aXN2eHR6eWZ0Z3ZzbmZpYjF0bnNpbjZic3ZzYjZ6eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8L0Pky6C83SzkzU55a/giphy.gif" // A different animated 404 GIF
          alt="Page Not Found" 
          className="w-64 h-auto my-4 rounded-4xl" // Adjusted margin and height to auto for GIF aspect ratio
        />
        <h1 className="text-6xl font-bold text-red-500 mb-4">Error Code: 404</h1>
        <h2 className="text-3xl font-semibold text-orange-500 mb-6">Oops! You seem lost in the digital ocean.</h2>
        <p className="text-lg text-base-content mb-8 max-w-">
          The page you are looking for doesn't exist, might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-success btn-lg rounded-2xl mb-8">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;