import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoginForm from '../authentication/LoginForm'; // Import the LoginForm component

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>Login - TourZen</title>
            </Helmet>
            {/* LoginForm already contains the hero section layout with Lottie and text */}
            <LoginForm />
        </>
    );
};

export default LoginPage;
