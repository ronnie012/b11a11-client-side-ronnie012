import axios from "axios";

// Create an Axios instance for public API calls (no JWT interceptor)
const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use your Vercel API base URL from .env
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;