import { useState } from "react";
import usePackages from "./usePackages";
import PackageCard from "./PackageCard";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const AllPackagesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { packages, loading, error } = usePackages(searchTerm);

  return (
    <div className="container mx-auto px-4 py-0">
      <Helmet>
        <title>All Tour Packages{searchTerm ? ` matching "${searchTerm}"` : ''} | TourZen</title>
      </Helmet>
      <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-success font-bold text-center mb-8">Explore Our Tour Packages</h1>

      {/* Search Input */}
      <div className="mb-12 flex justify-center">
        <input
          type="text"
          placeholder="Search by tour name..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          {searchTerm ? `No packages found matching "${searchTerm}".` : "No packages found."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.map((pkg) => (
            <PackageCard key={pkg._id} packageData={pkg} showGuideEmail={false} showGuideContactNo={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPackagesPage;