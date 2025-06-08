import { Helmet } from 'react-helmet-async';
import RegisterForm from '../authentication/RegisterForm'; // Import the RegisterForm component

const RegisterPage = () => {
    return (
        <>
            <Helmet>
                <title>Register - TourZen</title>
            </Helmet>
            <div className="hero min-h-[calc(100vh-200px)] bg-base-200">
                <div className="hero-content flex-col lg:flex-row"> {/* Adjusted flex direction for layout */}
                    <div className="text-center lg:text-left lg:pr-10"> {/* Adjusted padding */}
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Join TourZen to book exciting packages and manage your own tours as a guide.
                        </p>
                    </div>
                    <RegisterForm /> {/* Render the RegisterForm component here */}
                </div>
            </div>
        </>
    );
};

export default RegisterPage;