import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async'; // For react-helmet-async

function App() {
  return (
    <HelmetProvider> {/* Wrap your app with HelmetProvider */}
      {/* AuthProvider will be added here later */}
      <Outlet /> {/* This will render the routes defined in your router */}
      <Toaster position="top-right" reverseOrder={false} /> {/* For notifications */}
    </HelmetProvider>
  )
}

export default App
