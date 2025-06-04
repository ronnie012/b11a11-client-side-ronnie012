import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer'; // We can add this later

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet /> {/* Page content will be rendered here */}
      </main>
      <Footer /> {/* Add Footer here when ready */}
    </div>
  );
};

export default MainLayout;