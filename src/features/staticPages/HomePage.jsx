import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaUsers, FaShieldAlt, FaRegThumbsUp, FaQuoteLeft, FaStar, FaClock, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from 'react'; // Import React, useEffect, useRef, and useState
import useFeaturedPackages from '../packages/useFeaturedPackages'; // Import the new hook
import useGalleryImages from '../packages/useGalleryImages'; // Import the hook for gallery images
import { motion } from 'framer-motion'; // Import motion

// Import Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// Optional: if you want lightbox plugins like thumbnails, zoom, etc.
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import "yet-another-react-lightbox/plugins/thumbnails.css";

import LoadingSpinner from '../../components/shared/LoadingSpinner'; // Assuming you have this

const HomePage = () => {
  const { packages: featuredPackages, loading: packagesLoading, error: packagesError } = useFeaturedPackages();
  const { galleryImages, loading: galleryLoading, error: galleryError } = useGalleryImages();

  const whyChooseUsFeatures = [
    { icon: <FaMapMarkedAlt className="text-success text-5xl mb-3" />, title: 'Expert-Curated Itineraries', description: 'Thoughtfully planned trips by travel experts for unforgettable experiences and hidden gems.' },
    { icon: <FaUsers className="text-success text-5xl mb-3" />, title: 'Experienced Local Guides', description: 'Knowledgeable and friendly local guides to enrich your journey with authentic insights.' },
    { icon: <FaShieldAlt className="text-success text-5xl mb-3" />, title: 'Safe & Secure Travel', description: 'Your safety and comfort are our top priorities on all tours, with vetted partners.' },
    { icon: <FaRegThumbsUp className="text-success text-5xl mb-3" />, title: '24/7 Customer Support', description: 'We are here to help you around the clock – before, during, and after your trip.' },
  ];

  const testimonials = [
    { id: 1, quote: "An absolutely breathtaking experience! The guides were fantastic and everything was perfectly organized. Highly recommend TourZen!", author: "Sarah L.", tour: "Mystical Mountains Adventure", rating: 5, image: "https://randomuser.me/api/portraits/women/4.jpg", date: "July 2025" },
    { id: 2, quote: "Loved the coastal tour! Saw so much marine life and the beaches were pristine. TourZen made it all so easy.", author: "John B.", tour: "Coastal Wonders Expedition", rating: 5, image: "https://randomuser.me/api/portraits/men/5.jpg", date: "August 2025" },
    { id: 3, quote: "A great way to explore the city. The guide was very knowledgeable and passionate. Will book with TourZen again!", author: "Maria G.", tour: "Urban Explorer Getaway", rating: 4, image: "https://randomuser.me/api/portraits/women/6.jpg", date: "September 2025" },
  ];

  // Data for banner carousel - will use featuredPackages directly
  const carouselRef = useRef(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  // State for Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!carouselRef.current || !featuredPackages || featuredPackages.length === 0) {
      return;
    }
    const numSlides = featuredPackages.length;

    const intervalId = setInterval(() => {
      setActiveSlideIndex(prevActiveIndex => {
        const nextSlideIndex = (prevActiveIndex + 1) % numSlides;
        if (carouselRef.current) {
          const slideWidth = carouselRef.current.clientWidth;
          carouselRef.current.scrollTo({
            left: nextSlideIndex * slideWidth,
            behavior: 'smooth',
          });
        }
        return nextSlideIndex;
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [featuredPackages]); // Re-setup interval if featuredPackages changes

  // Update active slide index when user clicks navigation dots
  const handleDotClick = (index, event) => {
    if (event) event.preventDefault(); // Prevent default anchor behavior
    setActiveSlideIndex(index);
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth',
      });
    }
  };

  // It's good practice to also handle next/prev clicks similarly if they also use hrefs that might cause jumps.

  return (
    <div>
      <Helmet><title>Home - TourZen</title></Helmet>

      {/* Hero Banner Carousel using DaisyUI */}
      {/* For image issue: Ensure image paths in `bannerPackages` are correct. Check browser network tab for loading errors. */}
      {/* Inspect `img` elements: do they have correct src, width, height? Are they display:none or opacity:0? */}
      <div ref={carouselRef} className="carousel w-full h-[75vh] rounded-2xl"> {/* Ensure featuredPackages is not empty before mapping */}
        {featuredPackages && featuredPackages.map((pkg, index) => (
          <div
            key={pkg._id} // Use _id from MongoDB
            id={`slide${index + 1}`}
            className="carousel-item relative w-full h-[75vh] " // Explicitly set height to match parent's h-[75vh]
          >
            {/* Image */}
            <img
              src={pkg.image}
              className="absolute inset-0 w-full h-full object-cover z-0 " // Changed to absolute, added z-0
              alt={pkg.tour_name} // The overlay is z-10, so image should be behind it.
              onError={(e) => { console.error(`Image failed to load: ${pkg.image}`, e.target.onerror, e.target.src); e.target.style.display='none'; /* Optionally hide broken image icon */ }}
            />

            {/* Your Overlay */}
            <div className="absolute inset-0   flex flex-col items-center justify-center text-center p-4 z-10 bg-[rgba(0,0,0,0.5)]">
              <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white">{pkg.tour_name}</h1>
              <p className='text-white max-w-6xl mb-4'>{pkg.package_details}</p>
              <p className="mb-4 text-lg text-white max-w-lg">
                Duration: {pkg.duration} | Departure: {pkg.departure_date ? new Date(pkg.departure_date).toLocaleDateString() : 'N/A'}
              </p>
              <div className="flex flex-col gap-4 items-center">
                <Link to={`/package/${pkg._id}`} className="btn btn-success btn-outline hover:btn-warning">View Details</Link>
                <Link to="/all-packages" className="btn btn-outline hover:btn-accent btn-warning">Explore All Packages</Link>
              </div>
            </div>

            {/* DaisyUI Carousel Navigation */}
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
              <a
                href={`#slide${index === 0 ? featuredPackages.length : index}`}
                className="btn btn-circle btn-ghost text-2xl text-white hover:text-orange-500 border-none hover:bg-white/10" // Added btn-ghost for better visibility
                onClick={(e) => {
                  e.preventDefault();
                  const prevSlide = index === 0 ? featuredPackages.length - 1 : index - 1;
                  handleDotClick(prevSlide); // Re-use handleDotClick logic
                }}
              >
                ❮
              </a>
              <a
                href={`#slide${index + 2 > featuredPackages.length ? 1 : index + 2}`}
                className="btn btn-circle btn-ghost text-2xl text-white hover:text-orange-500 border-none hover:bg-white/10" // Added btn-ghost for better visibility
                onClick={(e) => {
                  e.preventDefault();
                  const nextSlide = (index + 1) % featuredPackages.length;
                  handleDotClick(nextSlide); // Re-use handleDotClick logic
                }}
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination dots for DaisyUI Carousel (optional) */}
      <div className="flex justify-center w-full py-2 gap-2">
        {featuredPackages && featuredPackages.map((pkg, index) => (
          <a
            key={`dot-${pkg._id}`}
            href={`#slide${index + 1}`}
            className={`btn btn-sm ${index === activeSlideIndex ? 'btn-success btn-outline' : 'btn-outline text-orange-500 hover:text-black hover:btn-warning'}`} // Apply 'btn-active' for the current slide
            onClick={(e) => handleDotClick(index, e)}
          >
            {index + 1}
          </a>
        ))}
      </div>

      {/* Featured Packages Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Tour Packages</h2>
          {packagesLoading && <LoadingSpinner />}
          {packagesError && <p className="text-center text-red-500">Error loading packages: {packagesError}</p>}
          {!packagesLoading && !packagesError && (!featuredPackages || featuredPackages.length === 0) && (
            <p className="text-center text-gray-500">No featured packages available at the moment.</p>
          )}
          {!packagesLoading && !packagesError && featuredPackages && featuredPackages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredPackages.map(pkg => (
                <div key={pkg._id} className="card bg-base-200 shadow-xl hover:shadow-2xl hover:scale-110 ring-2 ring-green-500 hover:ring-4 hover:ring-green-500 hover:bg-orange-400  transition-all duration-100 ease-in-out">
                  <figure className="h-60 overflow-hidden">
                    <img src={pkg.image || "https://via.placeholder.com/400x225.png?text=Tour+Image"} alt={pkg.tour_name} className="w-full h-full object-cover rounded-lg" />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-2xl">{pkg.tour_name}</h3>
                    <div className="flex items-center mt-2">
                      <div className="avatar mr-3">
                        <div className="w-10 rounded-full">
                          <img src={pkg.guide_photo || 'https://via.placeholder.com/40x40.png?text=G'} alt={pkg.guide_name} />
                        </div>
                      </div>
                      <span className="text-lg text-base-content/80 dark:text-base-content/70 font-semibold">{pkg.guide_name || 'N/A'}</span>
                    </div>
                    {/* Group for Duration, Departure, and Price with consistent y-spacing */}
                    <div className="space-y-1 mt-3 text-lg text-base-content/80 dark:text-base-content/70 font-bold"> {/* Apply common styles here */}
                      <p className="flex items-center"> {/* Inherit styles from parent */}
                        <FaClock className="mr-2 text-blue-400 text-lg" />
                        <span className="font-semibold mr-1">Duration:</span> {pkg.duration || 'N/A'} {/* Changed to font-semibold */}
                      </p>
                      <p className="flex items-center"> {/* Inherit styles from parent */}
                        <FaCalendarAlt className="mr-2 text-red-500 text-lg" />
                        <span className="font-semibold mr-1">Departure:</span> {pkg.departure_date ? new Date(pkg.departure_date).toLocaleDateString() : 'N/A'} {/* Changed to font-semibold */}
                      </p>
                      {/* Container for Price and View Details button */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center"> {/* Inherit styles from parent */}
                          <FaDollarSign className="mr-1 text-success text-2xl" />
                          <span className="font-semibold"> Price: {pkg.price?.toFixed(0) || 'N/A'}</span>
                        </div>
                        <Link to={`/package/${pkg._id}`} className="btn btn-outline btn-success hover:text-orange-500 hover:border-orange-500 hover:bg-neutral btn-sm">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Show All button */}
          <div className="text-center mt-12">
            <Link to="/all-packages" className="btn btn-success text-lg btn-wide hover:btn-warning">
              Show All
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose TourZen Section */}
      <section className="py-12 bg-base-200 rounded-2xl mb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose TourZen?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card bg-base-100 shadow-lg text-center p-6 hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }} // Start invisible and 50px down
                whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position when in view
                viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 30% of element is in view
                transition={{ duration: 1.5, delay: index * 0.3 }} // Stagger animation
              >
                <div className="flex justify-center">
                  {feature.icon}
                </div> {/* Adjusted text color for description */}
                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-base-content/70 dark:text-base-content/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Gallery Section with Lightbox */}
      {galleryLoading && <LoadingSpinner />}
      {galleryError && <p className="text-center text-red-500 rounded-2xl ">Error loading gallery: {galleryError}</p>}
      {!galleryLoading && !galleryError && galleryImages && galleryImages.length > 0 && (
        <section className="py-12 bg-base-200 rounded-2xl mb-6">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-10">Tour Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {galleryImages.map((item, index) => ( // Use galleryImages here
                <div
                  key={`gallery-thumb-${item._id}`}
                  className="aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <figure className="w-full h-full">
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      src={item.image || "https://via.placeholder.com/300x300.png?text=Tour+Image"} // Use item.image here
                      alt={`Gallery image for ${item.tour_name}`}
                    />
                  </figure>
                </div>
              ))}
            </div>
            {lightboxOpen && (
              <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={galleryImages.map(item => ({ // Use galleryImages for lightbox slides
                  src: item.image || "https://via.placeholder.com/1200x800.png?text=Tour+Image",
                  alt: item.tour_name,
                  title: item.tour_name,
                }))}
                // plugins={[Thumbnails, Zoom]} // Optional: add plugins
              />
            )}
          </div>
        </section>
      )}

      {/* Customer Testimonials Section */}
      <section className="py-10 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Hear From Our Happy Travelers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="card bg-base-200 shadow-xl p-6 flex flex-col items-center text-center hover:scale-110 transition-all duration-1 ease-in-out  hover:shadow-2xl ring-2 ring-success hover:ring-4 hover:ring-orange-500">
                <div className="avatar mb-4">
                  <div className="w-20 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
                    <img src={testimonial.image} alt={testimonial.author} />
                  </div>
                </div>
                <FaQuoteLeft className="text-3xl text-success mb-3" />
                <p className="text-base-content/80 dark:text-base-content/70 italic mb-4">&quot;{testimonial.quote}&quot;</p>
                <h4 className="font-semibold text-lg">{testimonial.author}</h4>
                <p className="text-sm text-base-content/60 dark:text-base-content/50">Took the &quot;{testimonial.tour}&quot; in {testimonial.date}</p> {/* Adjusted text color */}
                <div className="flex mt-2">{Array(testimonial.rating).fill(0).map((_, i) => <FaStar key={i} className="text-yellow-400" />)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
