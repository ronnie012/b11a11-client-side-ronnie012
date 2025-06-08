# TourZen - Tour Package Booking Platform (Client)

## Project Purpose

TourZen is a full-stack tour package booking platform designed to connect users with exciting travel experiences. It allows public users to explore available packages, authenticated users to book tours, and designated guides to add and manage their own tour offerings. The platform aims to provide a seamless and intuitive booking experience with a modern design.

## Features

*   **Public Access:** View all available tour packages and their details.
*   **User Authentication:** Secure login and registration using Email/Password and Google Sign-in (via Firebase).
*   **Role-Based Access:** Differentiate between public, authenticated users, and guides.
*   **Tour Package Management (Guide Role):** Guides can add, update, and delete their own tour packages (CRUD operations).
*   **Booking System:** Authenticated users can book tour packages.
*   **My Bookings:** View a list of all packages booked by the logged-in user.
*   **Responsive Design:** Fully functional and visually appealing on mobile, tablet, and desktop devices.
*   **Theme Toggle:** Switch between light and dark themes.
*   **Search Functionality:** Search for tour packages by name.
*   **Secure Routes:** Private routes protected using JWT authentication.
*   **Incremental Booking Count:** Track the number of bookings for each package.
*   **404 Page:** Custom page for handling invalid routes.
*   **About Us Page:** Informational page about the platform.

## Live URL

*   **Client:** https://
*   **Server:** https://


## Tech Stack

**Client-Side:**
*   React
*   Vite
*   Tailwind CSS
*   DaisyUI
*   React Router DOM
*   Firebase Authentication
*   React Hook Form (Optional but planned)
*   Framer Motion (Optional but planned)
*   React Icons
*   React Hot Toast
*   SweetAlert2
*   React Helmet Async

**Server-Side:**
*   Node.js
*   Express.js
*   MongoDB
*   JWT (JSON Web Tokens)
*   Firebase Admin SDK (for verifying Firebase tokens if used for backend auth)
*   Cors
*   Dotenv


## Used NPM Packages (Client)

```
@tailwindcss/vite
axios
firebase
framer-motion
localforage
match-sorter
react
react-dom
react-helmet-async
react-hook-form
react-toastify
react-icons
react-router
react-router-dom
sort-by
sweetalert2
tailwindcss
```


## Getting Started

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Set up environment variables (`.env`).
4.  Run the development server: `npm run dev`



