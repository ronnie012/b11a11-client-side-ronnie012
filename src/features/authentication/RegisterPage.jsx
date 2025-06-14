import { Helmet } from 'react-helmet-async';
import RegisterForm from '../authentication/RegisterForm'; // Import the RegisterForm component

const RegisterPage = () => {
    return (
        <>
            <Helmet>
                <title>Register - TourZen</title>
            </Helmet>
            {/* RegisterForm already contains the hero section layout with Lottie and text */}
            <RegisterForm />
        </>
    );
};

export default RegisterPage;