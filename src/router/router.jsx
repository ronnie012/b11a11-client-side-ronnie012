import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../features/staticPages/HomePage";
import RegisterPage from "../features/authentication/RegisterPage";
import LoginPage from "../features/authentication/LoginPage";
import NotFoundPage from "../features/staticPages/NotFoundPage";
import AboutUsPage from "../features/staticPages/AboutUsPage";
import AllPackagesPage from "../features/packages/AllPackagesPage";
import PackageDetailsPage from "../features/packages/PackageDetailsPage";
import MyBookingsPage from "../features/bookings/MyBookingsPage";
import PrivateRoute from "./PrivateRoute";
import AddPackagePage from "../features/packages/AddPackagePage";
import ManageMyPackagesPage from "../features/packages/ManageMyPackagesPage";
import UpdatePackagePage from "../features/packages/UpdatePackagePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // MainLayout is now the direct root element for this path
    // errorElement: <NotFoundPage />, // You can have a top-level error element here if needed
                                     // However, your path: "*" child route already handles 404s within MainLayout.
    children: [
      {
        index: true, // Makes HomePage the default for "/"
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />, // Will render inside MainLayout
      },
      {
        path: "/login",
        element: <LoginPage />, // Will render inside MainLayout
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/all-packages",
        element: <AllPackagesPage />,
      },
      {
        path: "/package/:id",
        element: <PackageDetailsPage />,
      },
      {
        path:"/add-package",
        element: <PrivateRoute><AddPackagePage /></PrivateRoute>
      },
      {
        path: "/manage-my-packages",
        element: <PrivateRoute><ManageMyPackagesPage /></PrivateRoute>
      },
      {
        path: "/update-package/:packageId", // Define the route path
        element: <PrivateRoute><UpdatePackagePage /></PrivateRoute>
      },
      {
        path: "/my-bookings",
        element: <PrivateRoute><MyBookingsPage /></PrivateRoute>,
      },
      {
        path: "*", // Catch-all for 404s, will render inside MainLayout
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
