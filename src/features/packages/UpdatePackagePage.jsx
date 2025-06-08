import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import usePackageDetails from './usePackageDetails'; // To fetch existing package data
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const UpdatePackagePage = () => {
  const { packageId } = useParams(); // Get packageId from URL
  const navigate = useNavigate();
  const { token } = useAuth();
  const { packageDetails, loading: fetchingLoading, error: fetchingError } = usePackageDetails(packageId);

  const [formData, setFormData] = useState({
    tour_name: '',
    image: '',
    duration: '',
    departure_location: '',
    destination: '',
    price: '',
    departure_date: '',
    package_details: '',
    // Guide info is typically not updated by the user directly here if it's tied to their profile
    // but if it was part of the original form and can be changed, include it.
    // For now, we'll assume guide_name and guide_photo are derived or not directly editable in this form.
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (packageDetails) {
      setFormData({
        tour_name: packageDetails.tour_name || '',
        image: packageDetails.image || '',
        duration: packageDetails.duration || '',
        departure_location: packageDetails.departure_location || '',
        destination: packageDetails.destination || '',
        price: packageDetails.price || '',
        departure_date: packageDetails.departure_date ? new Date(packageDetails.departure_date).toISOString().split('T')[0] : '', // Format for date input
        package_details: packageDetails.package_details || '',
      });
    }
  }, [packageDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
      };

      await axios.put(`${API_BASE_URL}/packages/${packageId}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Package updated successfully!');
      navigate('/manage-my-packages'); // Navigate back to manage page
    } catch (error) {
      console.error("Failed to update package:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Failed to update package.');
    } finally {
      setSubmitting(false);
    }
  };

  if (fetchingLoading) return <LoadingSpinner />;
  if (fetchingError) return <div className="text-center py-10 text-red-500">Error loading package details: {fetchingError}</div>;
  if (!packageDetails) return <div className="text-center py-10">Package not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Update Package - TourZen</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Update Tour Package</h1>      
      <div className="max-w-2xl mx-auto bg-base-200 p-8 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="tour_name" className="label"><span className="label-text">Tour Name</span></label>
            <input type="text" name="tour_name" id="tour_name" value={formData.tour_name} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label htmlFor="image" className="label"><span className="label-text">Image URL</span></label>
            <input type="url" name="image" id="image" value={formData.image} onChange={handleChange} className="input input-bordered w-full" placeholder="https://example.com/image.jpg" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="duration" className="label"><span className="label-text">Duration (e.g., 3 days)</span></label>
              <input type="text" name="duration" id="duration" value={formData.duration} onChange={handleChange} className="input input-bordered w-full" required />
            </div>
            <div>
              <label htmlFor="price" className="label"><span className="label-text">Price ($)</span></label>
              <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="input input-bordered w-full" min="0" step="0.01" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="departure_location" className="label"><span className="label-text">Departure Location</span></label>
              <input type="text" name="departure_location" id="departure_location" value={formData.departure_location} onChange={handleChange} className="input input-bordered w-full" required />
            </div>
            <div>
              <label htmlFor="destination" className="label"><span className="label-text">Destination</span></label>
              <input type="text" name="destination" id="destination" value={formData.destination} onChange={handleChange} className="input input-bordered w-full" required />
            </div>
          </div>
          <div>
            <label htmlFor="departure_date" className="label"><span className="label-text">Departure Date</span></label>
            <input type="date" name="departure_date" id="departure_date" value={formData.departure_date} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label htmlFor="package_details" className="label"><span className="label-text">Package Details</span></label>
            <textarea name="package_details" id="package_details" value={formData.package_details} onChange={handleChange} className="textarea textarea-bordered w-full h-32" required></textarea>
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
              {submitting ? <span className="loading loading-spinner"></span> : 'Update Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePackagePage;