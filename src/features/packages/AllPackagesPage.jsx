import usePackages from "./usePackages";
import PackageCard from "./PackageCard";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/shared/LoadingSpinner"; // Assuming you have a LoadingSpinner component

const AllPackagesPage = () => {
  const { packages, loading, error } = usePackages();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Error loading packages: {error}</p>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return <div className="text-center py-10">No packages found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-0">
      <Helmet>
        <title>All Tour Packages | TourZen</title>
      </Helmet>
      <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-success font-bold text-center mb-8">Explore Our Tour Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} packageData={pkg} />
        ))}
      </div>
    </div>
  );
};

export default AllPackagesPage;