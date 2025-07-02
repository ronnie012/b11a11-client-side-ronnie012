import { useState, useEffect } from "react";
import usePackages from "./usePackages";
import { useLocation, useNavigate } from "react-router-dom";
import PackageCard from "./PackageCard";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const AllPackagesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1;
  const initialLimit = parseInt(queryParams.get('limit')) || 10;
  const initialSearchTerm = queryParams.get('search') || '';

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialLimit);
  const [currentSearchTerm, setCurrentSearchTerm] = useState(initialSearchTerm);

  const { packages, loading, error, totalPages, totalPackages } = usePackages(currentSearchTerm, currentPage, itemsPerPage);

  console.log('AllPackagesPage - packages:', packages);
  console.log('AllPackagesPage - loading:', loading);
  console.log('AllPackagesPage - error:', error);

  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage !== 1) params.set('page', currentPage);
    if (itemsPerPage !== 10) params.set('limit', itemsPerPage);
    if (currentSearchTerm) params.set('search', currentSearchTerm);
    navigate(`?${params.toString()}`, { replace: true });
  }, [currentPage, itemsPerPage, currentSearchTerm, navigate]);

  const handleSearchChange = (e) => {
    setCurrentSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="container mx-auto px-2 md:px-6 py-0 mb-6">
      <Helmet>
        <title>All Tour Packages{currentSearchTerm ? ` matching "${currentSearchTerm}"` : ''} | TourZen</title>
      </Helmet>
      <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-success font-bold text-center mb-8">Explore Our Tour Packages</h1>

      {/* Search Input */}
      <div className="mb-12 flex justify-center">
        <input
          type="text"
          placeholder="Search by tour name..."
          className="input input-bordered w-full max-w-md"
          value={currentSearchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Packages Display Area */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          <p>Error loading packages: {error}</p>
        </div>
      ) : !packages || packages.length === 0 ? (
        <div className="text-center py-10">
          {currentSearchTerm ? `No packages found matching "${currentSearchTerm}".` : "No packages found."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {packages.map((pkg) => (
            <PackageCard key={pkg._id} packageData={pkg} showGuideEmail={false} showGuideContactNo={false} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {packages && packages.length > 0 && totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 space-y-4 md:space-y-0 mb-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="itemsPerPage" className="text-gray-700">Items per page:</label>
            <select
              id="itemsPerPage"
              className="select select-bordered"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPackagesPage;