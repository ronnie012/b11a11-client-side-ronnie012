import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'; // Combined imports
import { AuthContext } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png'; // Assuming your logo is here

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext); // Get user, logout, and loading state

  // Theme toggle state and logic
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
  const [avatarImgError, setAvatarImgError] = useState(false);

  useEffect(() => {
    // Reset image error state when user changes, to re-attempt loading photoURL for a new user
    setAvatarImgError(false);
  }, [user]);

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

  // Helper function to close the dropdown by blurring the active element (usually the dropdown label)
  const closeDropdown = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

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
          <li>
            <NavLink
              to="/add-package"
              className={({ isActive }) =>
                isActive ? 'text-success  font-semibold' : 'hover:text-orange-500 font-semibold'
              }
            >
              Add Package
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-my-packages"
              className={({ isActive }) =>
                isActive ? 'text-success  font-semibold' : 'hover:text-orange-500 font-semibold'
              }
            >
              Manage My Packages
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
    <div
      className={`navbar shadow-sm bg-base-100/60 backdrop-blur-md dark:bg-base-100/50 dark:backdrop-blur-xs justify-between rounded-box`}
    >
      
      <div className="navbar-start"> {/* Allow start to grow, its content will be at its start */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden px-1"> {/* Reduced horizontal padding */}
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
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100/80 backdrop-blur-md rounded-box w-52 dark:bg-base-200/70">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="text-lg sm:text-xl md:text-2xl text-success hover:text-orange-500 font-bold flex items-center ml-1 sm:ml-2"> {/* Adjusted size and margin */}
          {/* Add logo image */}
          <img src={logo} alt="TourZen Logo" className="h-6 w-7 sm:h-8 sm:w-9 mr-1 sm:mr-2 rounded-lg" /> {/* Responsive logo size */}
          {/* Site Name */}
          TourZen
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex flex-grow">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end"> {/* Allow end to grow, its content will be at its end (due to navbar-end style) */}
        {/* Theme Toggle */}
        <label className="swap swap-rotate mr-1 sm:mr-2 md:mr-4"> {/* Adjusted margin */}
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === 'dark'}
            className="theme-controller" // DaisyUI v5+ class for theme control
            value="synthwave" // Can be any theme name, actual theme is controlled by data-theme
          />
          {/* sun icon */}
          <svg className="swap-off hover:text-orange-500 fill-current w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29l.71-.71a1,1,0,0,0-1.41-1.41l-.71.71A1,1,0,0,0,5.64,7.05ZM12,15a5,5,0,1,0,5-5A5,5,0,0,0,12,15Zm12.71,1.29a1,1,0,0,0-.7.29l-.71.71a1,1,0,1,0,1.41,1.41l.71-.71a1,1,0,0,0,0-1.41ZM20,12a1,1,0,0,0-1-1H18a1,1,0,0,0,0,2h1A1,1,0,0,0,20,12ZM18.36,7.05a1,1,0,0,0-.7-.29,1,1,0,0,0-.71.29l-.71.71a1,1,0,0,0,1.41,1.41l.71-.71A1,1,0,0,0,18.36,7.05ZM12,9a3,3,0,1,1,3,3A3,3,0,0,1,12,9Zm7.05,6.36a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29l.71-.71a1,1,0,1,0-1.41-1.41l-.71.71A1,1,0,0,0,19.05,15.36ZM15,12a1,1,0,0,0-1-1H13a1,1,0,0,0,0,2h1A1,1,0,0,0,15,12Z"/></svg>
          {/* moon icon */}
          <svg className="swap-on hover:text-green-500 fill-current w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        </label>

        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                {user.photoURL && !avatarImgError ? (
                  <div className="w-8 sm:w-10 rounded-full"> {/* Responsive avatar size */}
                    <img
                      alt="User profile"
                      src={user.photoURL}
                      onError={() => setAvatarImgError(true)} // Fallback to initials if image fails
                    />
                  </div>
                ) : (
                  // Use DaisyUI's avatar placeholder structure for better theme handling and centering
                  <div className="avatar placeholder">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-base-200 text-base-content border border-base-600 flex items-center justify-center" // Responsive placeholder size
                         style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="text-md font-semibold leading-none"
                              style={{ lineHeight: 1, display: 'inline-block' }}>
                            {getInitials(user.displayName || user.email)}
                        </span>
                    </div>
                  </div>
                )}
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100/80 backdrop-blur-md rounded-box w-48 sm:w-52 dark:bg-base-200/70"> {/* Responsive dropdown width */}
                {/* Display user's name; can be a link to a profile page if planned */}
                <li>
                  <span className="justify-between font-semibold">
                    {user?.displayName || 'Profile'}
                  </span>
                </li>
                <li>
                  <button
                    onClick={() => { logout(); closeDropdown(); }}
                    className="btn btn-ghost btn-sm w-full justify-start"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-success btn-xs sm:btn-sm mr-1 sm:mr-2"> {/* Responsive button size and margin */}
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-warning btn-xs sm:btn-sm"> {/* Responsive button size */}
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

// Helper function to get initials
const getInitials = (name) => {
  if (!name || typeof name !== 'string') return 'U'; // Default to 'U' if no name
  const nameParts = name.split(' ');
  if (nameParts.length > 1) {
    // For names like "John Doe", return "JD"
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  } else if (name.includes('@')) {
    // For emails like "john@example.com", return "J"
    return name[0].toUpperCase();
  } else if (name.length > 0) {
    // For single names like "John", return "J"
    return name[0].toUpperCase();
  }
  return 'U'; // Fallback
};

export default Navbar;
