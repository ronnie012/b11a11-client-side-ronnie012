import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoginForm from '../authentication/LoginForm'; // Import the LoginForm component

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>Login - TourZen</title>
            </Helmet>
            <div className="hero min-h-[calc(100vh-200px)] bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left lg:pl-10">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Access your account to manage your bookings, add new tour packages, and explore exclusive offers.
                        </p>
                    </div>
                    <LoginForm /> {/* Render the LoginForm component here */}
                </div>
            </div>
        </>
    );
};

export default LoginPage;


