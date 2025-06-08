import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import AuthProvider from "./contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from 'react-toastify'; // Import from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000} // Stays for 5 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" // Or "dark", "colored"
        />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
