import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; // Your root App component with Outlet and providers
import MainLayout from '../layouts/MainLayout';
import HomePage from '../features/staticPages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Root component with global providers
    children: [
      {
        element: <MainLayout />, // Layout for common pages
        children: [{ index: true, element: <HomePage /> }],
      },
    ],
  },
]);

export default router;

//