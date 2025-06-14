import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify'; // Changed to react-toastify
// **IMPORTANT**: Adjust this path to your Lottie animation JSON file
import loginAnimation from '../../assets/lottiefiles/lottiefiles-login-animation.json'; // Assuming a login animation

const LoginForm = () => {
    const { signIn, signInWithGoogle, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            await signIn(email, password);
            toast.success('Logged in successfully!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.message || 'Failed to login. Please check your credentials.');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            toast.success('Logged in with Google successfully!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Google Sign-In error:", error);
            toast.error(error.message || 'Failed to login with Google.');
        }
    };

    return (
        <div className="hero  bg-base-200 py-6">
            <div className="hero-content flex-col lg:flex-row-reverse items-center">
                <div className="text-center lg:text-left lg:w-1/2 lg:pl-10">
                    <Lottie
                        loop
                        autoplay
                        animationData={loginAnimation}
                        style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}
                    />
                    <h1 className="text-4xl font-bold mt-6 text-center">Login to Your Account</h1>
                    <p className="py-6 text-center text-base-content/80">
                        Welcome back! Login to access your bookings, manage packages, and continue your journey with exclusive offers suitable for you from TourZen.
                    </p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-1/2">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                })}
                            />
                            {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className={`input input-bordered pr-10 ${errors.password ? 'input-error' : ''}`}
                                {...register("password", { required: "Password is required" })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 top-0 pr-6 flex items-center text-xl text-gray-500 hover:text-gray-700"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
                            <label className="label mt-1">
                                <a href="#" className="label-text-alt link link-hover link-primary">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading ? <span className="loading loading-spinner"></span> : "Login"}
                            </button>
                        </div>
                    </form>
                    <div className="divider px-8">OR</div>
                    <div className="p-4 pt-0 text-center">
                        <button
                            onClick={handleGoogleSignIn}
                            className="btn btn-outline btn-accent w-full mb-2"
                            disabled={loading}
                        >
                            <FaGoogle className="mr-2" /> Continue with Google
                        </button>
                        <p className="text-sm">
                            Don't have an account? <Link to="/register" className="link link-primary hover:link-secondary">Register here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;