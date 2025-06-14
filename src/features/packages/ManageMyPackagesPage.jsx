import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useMyCreatedPackages from './useMyCreatedPackages';
import PackageManagementItem from './PackageManagementItem';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Link } from 'react-router-dom'; // Import Link for the button

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const ManageMyPackagesPage = () => {
  const { packages, loading, error, refetch } = useMyCreatedPackages();
  const { token } = useAuth();
  const [deletingId, setDeletingId] = useState(null);

  const handleDeletePackage = async (packageId, packageName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the package: "${packageName}". This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (!token) {
          toast.error("Authentication required.");
          return;
        }
        setDeletingId(packageId);
        try {
          await axios.delete(`${API_BASE_URL}/packages/${packageId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          // toast.success(`Package "${packageName}" deleted successfully!`);
          Swal.fire(
            'Deleted!',
            `Package "${packageName}" has been deleted.`,
            'success'
          );
          refetch(); // Refetch the list of packages
        } catch (err) {
          toast.error(err.response?.data?.message || 'Failed to delete package.');
          console.error("Error deleting package:", err);
        } finally {
          setDeletingId(null);
        }
      }
    });
  };

  if (loading && !packages.length) { // Show spinner only on initial load
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-0">
      <Helmet>
        <title>Manage My Packages - TourZen</title>
      </Helmet>
      <h1 className="xl:text-5xl lg:text-5xl md:text-5xl text-4xl font-bold mb-8 text-center text-success">Manage My Packages</h1>
      
      {loading && packages.length > 0 && <div className="text-center my-0"><span className="loading loading-dots loading-md"></span></div>}

      {!loading && packages.length === 0 && !error && (
        <div className="text-center py-6">
          <h2 className="text-5xl font-semibold text-gray-700 dark:text-gray-300 mb-6">No Packages Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">It looks like you haven't added any tour packages yet. <br />Ready to share your amazing tours with the world?</p>
          <Link to="/add-package" className="btn btn-success">
            Add Your First Package
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {packages.map(pkg => (
          <PackageManagementItem 
            key={pkg._id} 
            pkg={pkg} 
            onDelete={handleDeletePackage}
            isDeleting={deletingId === pkg._id} 
          />
        ))}
      </div>
    </div>
  );
};

export default ManageMyPackagesPage;
