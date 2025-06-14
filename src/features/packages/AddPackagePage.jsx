import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../contexts/AuthContext'; // Ensure useAuth provides user details
import { useForm } from 'react-hook-form'; // Import useForm
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const AddPackagePage = () => {
  const { token, user } = useAuth(); // Get user object from AuthContext
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    defaultValues: { // Set default values for the form
      tour_name: '',
      image: '',
      duration: '',
      departure_location: '',
      destination: '',
      price: '',
      departure_date: '',
      package_details: '',
      guide_name: user?.displayName || '',
      guide_photo: user?.photoURL || '',
      guide_email: user?.email || '',
      guide_contact_no: '',
    }
  });
  const [loading, setLoading] = useState(false);

  // Effect to pre-fill guide information from the logged-in user
  useEffect(() => {
    if (user) {
      // Use setValue from react-hook-form to update form fields
      setValue('guide_name', user.displayName || '');
      setValue('guide_photo', user.photoURL || '');
      setValue('guide_email', user.email || '');
    }
  }, [user, setValue]); // Re-run if the user object or setValue changes

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }
    setLoading(true);
    try {
      // Data is already structured by react-hook-form
      // Ensure price is a number
      const payload = {
        ...data,
        price: parseFloat(data.price),
      };

      await axios.post(`${API_BASE_URL}/packages`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Package added successfully!');
      // Reset form using react-hook-form's reset method
      reset({ // Reset to defaultValues or specific values
        tour_name: '', // Explicitly reset all fields
        image: '',
        duration: '',
        departure_location: '',
        destination: '',
        price: '',
        departure_date: '',
        package_details: '',
        guide_name: user?.displayName || '', // Re-populate guide info from user
        guide_photo: user?.photoURL || '',
        guide_email: user?.email || '',
        guide_contact_no: '',
      });
    } catch (error) {
      console.error("Failed to add package:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || 'Failed to add package.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-0">
      <Helmet>
        <title>Add New Package - TourZen</title>
      </Helmet>
      <h1 className="text-5xl font-bold mb-8 text-center text-success">Add a New Tour Package</h1>
      <div className="max-w-2xl mx-auto bg-base-200 p-8 rounded-lg shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="tour_name" className="label"><span className="label-text">Tour Name</span></label>
            <input
              type="text"
              id="tour_name" placeholder='Enter tour name'
              className={`input input-bordered w-full ${errors.tour_name ? 'input-error' : ''}`}
              {...register("tour_name", { required: "Tour name is required" })}
            />
            {errors.tour_name && <span className="text-error text-xs mt-1">{errors.tour_name.message}</span>}
          </div>
          <div>
            <label htmlFor="image" className="label"><span className="label-text">Image</span></label>
            <input
              type="url"
              id="image"
              placeholder="Enter image URL"
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
              <label htmlFor="duration" className="label"><span className="label-text">Duration (e.g., 3 Days, 2 Nights.)</span></label>
              <input
                type="text"
                id="duration" placeholder='Enter Duration'
                className={`input input-bordered w-full ${errors.duration ? 'input-error' : ''}`}
                {...register("duration", { required: "Duration is required" })}
              />
              {errors.duration && <span className="text-error text-xs mt-1">{errors.duration.message}</span>}
            </div>
            <div>
              <label htmlFor="price" className="label"><span className="label-text">Price ($)</span></label>
              <input
                type="number"
                id="price" placeholder='Enter price'
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
                id="departure_location" placeholder='Enter departure location'
                className={`input input-bordered w-full ${errors.departure_location ? 'input-error' : ''}`}
                {...register("departure_location", { required: "Departure location is required" })}
              />
              {errors.departure_location && <span className="text-error text-xs mt-1">{errors.departure_location.message}</span>}
            </div>
            <div>
              <label htmlFor="destination" className="label"><span className="label-text">Destination</span></label>
              <input
                type="text"
                id="destination" placeholder='Enter destination'
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
              id="package_details" placeholder='Enter package details'
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
              name="guide_name"
              id="guide_name" // Keep id for label
              {...register("guide_name")} // Register, but it's readOnly and pre-filled
              className="input input-bordered w-full"
              readOnly // Make read-only if it's always from Firebase user
            />
          </div>
          <div>
            <label htmlFor="guide_photo" className="label"><span className="label-text">Guide's Photo URL</span></label>
            <input
              type="url"
              name="guide_photo"
              id="guide_photo" // Keep id for label
              {...register("guide_photo")} // Register, but it's readOnly and pre-filled
              className="input input-bordered w-full"
              placeholder="https://example.com/guide.jpg"
              readOnly // Make read-only if it's always from Firebase user
            />
          </div>
          <div>
            <label htmlFor="guide_email" className="label"><span className="label-text">Guide's Email</span></label>
            <input
              type="email"
              name="guide_email"
              id="guide_email" // Keep id for label
              {...register("guide_email")} // Register, but it's readOnly and pre-filled
              className="input input-bordered w-full"
              placeholder="guide@example.com"
              readOnly // Make read-only if it's always from Firebase user
            />
          </div>
          <div>
            <label htmlFor="guide_contact_no" className="label"><span className="label-text">Guide's Contact Number</span></label>
            <input
              type="tel"
              id="guide_contact_no"
              placeholder="Enter guide's contact number"
              className={`input input-bordered w-full ${errors.guide_contact_no ? 'input-error' : ''}`}
              {...register("guide_contact_no", { required: "Guide contact number is required" })}
            />
            {errors.guide_contact_no && <span className="text-error text-xs mt-1">{errors.guide_contact_no.message}</span>}
          </div>
          <div>
            <button type="submit" className="btn btn-success w-full" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : 'Add Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackagePage;
