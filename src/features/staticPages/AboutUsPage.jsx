import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaUsers, FaBullseye, FaEnvelope } from 'react-icons/fa';

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | TourZen</title>
      </Helmet>
      <div className="bg-base-100 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="xl:text-5xl lg:text-5xl md:text-5xl text-3xl font-extrabold text-center text-success mb-10">
            About TourZen
          </h1>

          <section className="mb-12 p-6 bg-base-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-orange-500 mb-4 flex items-center">
              <FaBullseye className="mr-3 text-success" /> Our Mission
            </h2>
            <p className="text-lg text-base-content leading-relaxed">
              At TourZen, our mission is to connect adventurers with unforgettable travel experiences. We strive to provide a seamless platform for discovering, planning, and booking unique tour packages curated by passionate local guides. We believe travel enriches lives, and we're dedicated to making extraordinary journeys accessible to everyone.
            </p>
          </section>

          <section className="mb-12 p-6 bg-base-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-orange-500 mb-4 flex items-center">
              <FaUsers className="mr-3 text-success" /> Who We Are
            </h2>
            <p className="text-lg text-base-content leading-relaxed mb-4">
              TourZen was founded by a team of travel enthusiasts and tech innovators who saw an opportunity to simplify the way people explore the world. We are a diverse group united by our love for adventure and our commitment to building a platform that empowers both travelers and tour providers.
            </p>
            <p className="text-lg text-base-content leading-relaxed">
              {/* You can add more details about your team or company values here */}
              Our platform is built on the principles of trust, transparency, and a deep respect for local cultures and environments.
            </p>
          </section>

          <section className="p-6 bg-base-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-orange-500 mb-4 flex items-center">
              <FaEnvelope className="mr-3 text-success" /> Get In Touch
            </h2>
            <p className="text-lg text-base-content leading-relaxed mb-2">
              Have questions, suggestions, or just want to say hello? We'd love to hear from you!
            </p>
            <a href="mailto:contact@tourzen.com" className="text-lg text-info hover:underline">
              contact@tourzen.com
            </a>
            {/* You can add more contact methods or a contact form link here */}
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;