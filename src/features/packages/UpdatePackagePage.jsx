import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import usePackageDetails from './usePackageDetails'; // To fetch existing package data
import { useForm } from 'react-hook-form'; // Import useForm
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

  const { register, handleSubmit, formState: { errors }, reset } = useForm({    defaultValues: { // It's good practice to set defaultValues
    image: '',
    duration: '',
    departure_location: '',
    destination: '',
    price: '',
    departure_date: '',
    package_details: '',
    guide_name: '',
    guide_photo: '',
    guide_email: '',
    guide_contact_no: ''
  }});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (packageDetails) {
      // Use reset to populate the form with fetched details
      reset({
        tour_name: packageDetails.tour_name || '',
        image: packageDetails.image || '',
        duration: packageDetails.duration || '',
        departure_location: packageDetails.departure_location || '',
        destination: packageDetails.destination || '',
        price: packageDetails.price || '', // react-hook-form will handle as string initially
        departure_date: packageDetails.departure_date ? new Date(packageDetails.departure_date).toISOString().split('T')[0] : '', // Format for date input
        package_details: packageDetails.package_details || '',
        guide_name: packageDetails.guide_name || '',
        guide_photo: packageDetails.guide_photo || '',
        guide_email: packageDetails.guide_email || '',
        guide_contact_no: packageDetails.guide_contact_no || '',
      });
    }
  }, [packageDetails, reset]); // Add reset to dependencies

  // handleChange is no longer needed as react-hook-form handles input changes

  const onSubmit = async (data) => { // Renamed to onSubmit, receives validated data
    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }
    setSubmitting(true);
    try {
      // data object already contains all form values
      const payload = {
        ...data,
        price: parseFloat(data.price), // Ensure price is a number
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
      <h1 className="text-5xl font-bold mb-8 text-center text-success">Update Tour Package</h1>      
      <div className="max-w-2xl mx-auto bg-base-200 p-8 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> {/* Use handleSubmit(onSubmit) */}
          <div>
            <label htmlFor="tour_name" className="label"><span className="label-text">Tour Name</span></label>
            <input
              type="text"
              id="tour_name"
              className={`input input-bordered w-full ${errors.tour_name ? 'input-error' : ''}`}
              {...register("tour_name", { required: "Tour name is required" })}
            />
            {errors.tour_name && <span className="text-error text-xs mt-1">{errors.tour_name.message}</span>}
          </div>
          <div>
            <label htmlFor="image" className="label"><span className="label-text">Image URL</span></label>
            <input
              type="url"
              id="image"
              placeholder="https://example.com/image.jpg"
              className={`input input-bordered w-full ${errors.image ? 'input-error' : ''}`}
              {...register("image", {
                required: "Image URL is required",
                pattern: { value: /^(ftp|http|https):\/\/[^ "]+$/, message: "Invalid URL format" }
              })}
            />
            {errors.image && <span className="text-error text-xs mt-1">{errors.image.message}</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="duration" className="label"><span className="label-text">Duration (e.g., 3 Days, 4 Nights.)</span></label>
              <input
                type="text"
                id="duration"
                className={`input input-bordered w-full ${errors.duration ? 'input-error' : ''}`}
                {...register("duration", { required: "Duration is required" })}
              />
              {errors.duration && <span className="text-error text-xs mt-1">{errors.duration.message}</span>}
            </div>
            <div>
              <label htmlFor="price" className="label"><span className="label-text">Price ($)</span></label>
              <input
                type="number"
                id="price"
                min="0"
                step="0.01"
                className={`input input-bordered w-full ${errors.price ? 'input-error' : ''}`}
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Price must be a positive number" }
                })}
              />
              {errors.price && <span className="text-error text-xs mt-1">{errors.price.message}</span>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="departure_location" className="label"><span className="label-text">Departure Location</span></label>
              <input
                type="text"
                id="departure_location"
                className={`input input-bordered w-full ${errors.departure_location ? 'input-error' : ''}`}
                {...register("departure_location", { required: "Departure location is required" })}
              />
              {errors.departure_location && <span className="text-error text-xs mt-1">{errors.departure_location.message}</span>}
            </div>
            <div>
              <label htmlFor="destination" className="label"><span className="label-text">Destination</span></label>
              <input
                type="text"
                id="destination"
                className={`input input-bordered w-full ${errors.destination ? 'input-error' : ''}`}
                {...register("destination", { required: "Destination is required" })}
              />
              {errors.destination && <span className="text-error text-xs mt-1">{errors.destination.message}</span>}
            </div>
          </div>
          <div>
            <label htmlFor="departure_date" className="label"><span className="label-text">Departure Date</span></label>
            <input
              type="date"
              id="departure_date"
              className={`input input-bordered w-full ${errors.departure_date ? 'input-error' : ''}`}
              {...register("departure_date", { required: "Departure date is required" })}
            />
            {errors.departure_date && <span className="text-error text-xs mt-1">{errors.departure_date.message}</span>}
          </div>
          <div>
            <label htmlFor="package_details" className="label"><span className="label-text">Package Details</span></label>
            <textarea
              id="package_details"
              className={`textarea textarea-bordered w-full h-32 ${errors.package_details ? 'textarea-error' : ''}`}
              {...register("package_details", { required: "Package details are required" })}
            ></textarea>
            {errors.package_details && <span className="text-error text-xs mt-1">{errors.package_details.message}</span>}
          </div>

          <h2 className="text-xl font-semibold pt-4 border-t border-base-300">Guide Information</h2>
          <div>
            <label htmlFor="guide_name" className="label"><span className="label-text">Guide's Name</span></label>
            <input
              type="text"
              id="guide_name"
              className={`input input-bordered w-full ${errors.guide_name ? 'input-error' : ''}`}
              {...register("guide_name")} readOnly// Assuming guide_name can be updated, add validation if required
            />
            {errors.guide_name && <span className="text-error text-xs mt-1">{errors.guide_name.message}</span>}
          </div>
          <div>
            <label htmlFor="guide_photo" className="label"><span className="label-text">Guide's Photo URL</span></label>
            <input
              type="url"
              id="guide_photo"
              placeholder="https://example.com/guide.jpg"
              className={`input input-bordered w-full ${errors.guide_photo ? 'input-error' : ''}`}
              {...register("guide_photo", {
                pattern: { value: /^(ftp|http|https):\/\/[^ "]+$/, message: "Invalid URL format" }
              })} readOnly
            />
            {errors.guide_photo && <span className="text-error text-xs mt-1">{errors.guide_photo.message}</span>}
          </div>
                    <div>
            <label htmlFor="guide_email" className="label"><span className="label-text">Guide's Email</span></label>
            <input type="email" id="guide_email" className="input input-bordered w-full" placeholder="guide@example.com" {...register("guide_email")} readOnly /> {/* Guide email usually shouldn't be changed by the updater if it's tied to the original guide */}
          </div>
          <div>
            <label htmlFor="guide_contact_no" className="label"><span className="label-text">Guide's Contact Number</span></label>
            <input
              type="tel"
              id="guide_contact_no"
              placeholder="+1234567890"
              className={`input input-bordered w-full ${errors.guide_contact_no ? 'input-error' : ''}`}
              {...register("guide_contact_no")} // Add validation if required
            />
            {errors.guide_contact_no && <span className="text-error text-xs mt-1">{errors.guide_contact_no.message}</span>}
          </div>
          <div>
            <button type="submit" className="btn btn-success w-full" disabled={submitting}>
              {submitting ? <span className="loading loading-spinner"></span> : 'Update Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePackagePage;
