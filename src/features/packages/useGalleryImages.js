import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const useGalleryImages = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/packages/gallery-images`);
        setGalleryImages(response.data || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch gallery images');
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []); // Empty dependency array means this runs once on mount

  return { galleryImages, loading, error };
};

export default useGalleryImages;