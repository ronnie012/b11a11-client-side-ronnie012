import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const AddPackagePage = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    tour_name: '',
    image: '', // URL for the image
    duration: '', // e.g., "3 days", "5 hours"
    departure_location: '',
    destination: '',
    price: '',
    departure_date: '',
    package_details: '', // Description
    guide_name: '',
    guide_photo: '', // URL for guide's photo
    guide_email: '', // New field for guide's email
    guide_contact_no: '', // New field for guide's contact number
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      // Convert price to number and ensure departure_date is in a suitable format if needed
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
      };

      await axios.post(`${API_BASE_URL}/packages`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Package added successfully!');
      // Reset form
      setFormData({
        tour_name: '',
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
              <label htmlFor="duration" className="label"><span className="label-text">Duration (e.g., 3 Days, 2 Nights)</span></label>
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
          <h2 className="text-xl font-semibold pt-4 border-t border-base-300">Guide Information</h2>
          <div>
            <label htmlFor="guide_name" className="label"><span className="label-text">Guide Name</span></label>
            <input type="text" name="guide_name" id="guide_name" value={formData.guide_name} onChange={handleChange} className="input input-bordered w-full" />
          </div>
          <div>
            <label htmlFor="guide_photo" className="label"><span className="label-text">Guide Photo URL (Optional)</span></label>
            <input type="url" name="guide_photo" id="guide_photo" value={formData.guide_photo} onChange={handleChange} className="input input-bordered w-full" placeholder="https://example.com/guide.jpg" />
          </div>
                    <div>
            <label htmlFor="guide_contact_no" className="label"><span className="label-text">Guide Contact Number</span></label>
            <input type="tel" name="guide_contact_no" id="guide_contact_no" value={formData.guide_contact_no} onChange={handleChange} className="input input-bordered w-full" placeholder="+1234567890" />
          </div>
          <div>
            <label htmlFor="guide_email" className="label"><span className="label-text">Guide Email</span></label>
            <input type="email" name="guide_email" id="guide_email" value={formData.guide_email} onChange={handleChange} className="input input-bordered w-full" placeholder="guide@example.com" />
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