import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  return (
    <div>
      <Helmet><title>Home - TourZen</title></Helmet>
      <h1 className="text-6xl text-orange-500 font-bold text-center my-10 ">Welcome to TourZen!</h1>
      <p className="text-center text-lg">Your adventure starts here. This is the home page content.</p>
      <div className="text-center mt-8"><button className="btn btn-success hover:btn-warning">Explore Tours</button></div>
    </div>
  );
};

export default HomePage;