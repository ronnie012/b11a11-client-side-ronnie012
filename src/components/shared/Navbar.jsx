import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'; // Combined imports
import { AuthContext } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png'; // Assuming your logo is here

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get user and logout from context

  // Theme toggle state and logic
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');

  const handleToggle = e => {
    if (e.target.checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-success  font-semibold' : 'hover:text-orange-500 font-semibold'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-packages"
          className={({ isActive }) =>
            isActive ? 'text-success  font-semibold' : 'hover:text-orange-500 font-semibold'
          }
        >
          All Packages
        </NavLink>
      </li>
      {user && ( // Links for logged-in users, check if user exists
        <>
          <li>
            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                isActive ? 'text-success  font-semibold' : 'hover:text-orange-500 font-semibold'
              }
            >
              My Bookings
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive ? 'text-success  font-semibold' : 'hover:text-orange-500 font-semibold'
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className=" text-xl md:text-2xl text-success hover:text-orange-500 font-bold flex items-center">
          {/* Add logo image */}
          <img src={logo} alt="TourZen Logo" className="h-8 w-9 mr-2" /> {/* Adjust size and margin as needed */}
          {/* Site Name */}
          TourZen
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {/* Theme Toggle */}
        <label className="swap swap-rotate mr-2 md:mr-4">
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === 'dark'}
            className="theme-controller" // DaisyUI v5+ class for theme control
            value="synthwave" // Can be any theme name, actual theme is controlled by data-theme
          />
          {/* sun icon */}
          <svg className="swap-off hover:text-orange-500 fill-current w-6 h-6 md:w-7 md:h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29l.71-.71a1,1,0,0,0-1.41-1.41l-.71.71A1,1,0,0,0,5.64,7.05ZM12,15a5,5,0,1,0,5-5A5,5,0,0,0,12,15Zm12.71,1.29a1,1,0,0,0-.7.29l-.71.71a1,1,0,1,0,1.41,1.41l.71-.71a1,1,0,0,0,0-1.41ZM20,12a1,1,0,0,0-1-1H18a1,1,0,0,0,0,2h1A1,1,0,0,0,20,12ZM18.36,7.05a1,1,0,0,0-.7-.29,1,1,0,0,0-.71.29l-.71.71a1,1,0,0,0,1.41,1.41l.71-.71A1,1,0,0,0,18.36,7.05ZM12,9a3,3,0,1,1,3,3A3,3,0,0,1,12,9Zm7.05,6.36a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29l.71-.71a1,1,0,1,0-1.41-1.41l-.71.71A1,1,0,0,0,19.05,15.36ZM15,12a1,1,0,0,0-1-1H13a1,1,0,0,0,0,2h1A1,1,0,0,0,15,12Z"/></svg>
          {/* moon icon */}
          <svg className="swap-on hover:text-green-500 fill-current w-6 h-6 md:w-7 md:h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        </label>

        {user ? ( // Conditionally render based on user existence
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {/* Use user's photoURL or a fallback avatar */}
                <img alt="User profile" src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=random`} />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {/* Display user's name; can be a link to a profile page if planned */}
              <li>
                <span className="justify-between font-semibold">
                  {user?.displayName || 'Profile'}
                  {/* <span className="badge">New</span> */}
                </span>
              </li>
              <li><Link to="/add-package">Add Package</Link></li>
              <li><Link to="/manage-my-packages">Manage My Packages</Link></li>
              <li><button onClick={logout} className="btn btn-ghost btn-sm w-full justify-start">Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-success btn-xs md:btn-sm lg:btn-md mr-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-primary btn-xs md:btn-sm lg:btn-md">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;