import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer'; // We can add this later

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet /> {/* Page content will be rendered here */}
      </main>
      <div className="container mx-auto px-4">
        <Footer /> {/* Add Footer here when ready */}
      </div>
    </div>
  );
};

export default MainLayout;