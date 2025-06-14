import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Assuming your logo is here

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content text-center md:text-left">
      <div className="footer p-4 px-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center md:justify-items-start">
        {/* Section 1: Links */}
        <nav className="flex flex-col items-center sm:items-start w-full">
          <h6 className="footer-title">Services</h6>
          <Link to="/about-us" className="link link-hover">About us</Link>
          <a href="#" className="link link-hover">Contact</a>
          <a href="#" className="link link-hover">Terms & Conditions</a>
          <a href="#" className="link link-hover">Privacy Policy</a>
        </nav>
        {/* Section 2: Brand info */}
        <aside className="flex flex-col items-center sm:items-start w-full">
          <h6 className="footer-title">Company</h6> {/* Keep the title */}
          {/* Add logo and site name */}
          <Link to="/" className="flex items-center text-2xl font-bold text-success hover:text-orange-500 ">
            <img src={logo} alt="TourZen Logo" className="h-13 w-15 mr-2 rounded-xl" />TourZen</Link> {/* Changed text-success to text-primary for consistency */}
          <p>Your Adventure Starts Here</p>
          <p>123 Adventure Lane, Wanderlust City, BC.</p>
        </aside>
        {/* Section 3: Social Links */}
        <nav className="flex flex-col items-center sm:items-start w-full">
          <h6 className="text-xl footer-title normal-case">Let's stay connected</h6>
          <div className='grid grid-flow-col gap-4 mt-2'> {/* DaisyUI's grid for social icons */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook className="w-8 h-8 text-blue-400 hover:text-success cursor-pointer" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className="w-8 h-8 text-blue-400 hover:text-success cursor-pointer" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="w-8 text-blue-400 h-8 hover:text-success cursor-pointer" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin className="w-8 text-blue-400 h-8 hover:text-success cursor-pointer" /></a>
          </div>
        </nav>
        {/* Section 4: Newsletter */}
        <div className="w-full max-w-md flex flex-col items-center sm:items-start">
          <h6 className="text-xl footer-title normal-case">Newsletter</h6>
          <p className="mb-2 text-sm">Don't miss your suitable packages and offers. Subscribe to get discounts, offers, and updates.</p>
          <form className="join w-full">
            <input type="email" placeholder="Enter your valid email." className="input input-bordered join-item w-full" />
            <button className="btn btn-success hover:btn-warning join-item">Subscribe</button>
          </form>
        </div>
      </div>
      {/* Copyright section - full width at the bottom */}
      <div className="footer footer-center p-4 border-t border-base-300 text-center">
        <p>Copyright © {new Date().getFullYear()} - All right reserved by TourZen Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;