import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
// **IMPORTANT**: Adjust this path to your Lottie animation JSON file
import registrationAnimation from '../../assets/lottiefiles/lottiefiles-register-animation.json';

const RegisterForm = () => {
    const { createUser, updateUserProfile, signInWithGoogle, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { name, email, password, photoURL } = data;

        // react-hook-form handles validation based on rules in `register`
        // Errors are displayed inline

        try {
            await createUser(email, password);
            await updateUserProfile(name, photoURL);
            toast.success('Registration successful!');
            navigate('/'); // Redirect to homepage after registration
        } catch (error) {
            console.error("Registration error:", error);
            toast.error(error.message || 'Registration failed. Please try again.');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            toast.success('Registration with Google successful!');
            navigate('/'); // Redirect to homepage after registration
        } catch (error) {
            console.error("Google Sign-In error:", error);
            toast.error(error.message || 'Failed to register with Google.');
        }
    };

    return (
        <div className="hero bg-base-200 py-4">
            <div className="hero-content flex-col lg:flex-row-reverse items-center">
                <div className="text-center lg:text-left lg:w-1/2 lg:pl-10">
                    <Lottie
                        loop
                        autoplay
                        animationData={registrationAnimation}
                        style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}
                    />
                    <h1 className="text-4xl font-bold mt-6 text-center">Register now!</h1>
                    <p className="py-6 text-center text-base-content/80">
                        Join TourZen and start planning your next adventure. Register to access exclusive deals and manage your bookings.
                    </p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-1/2">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
                        </div>
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
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])/,
                                        message: "Must include uppercase & lowercase letters"
                                    }
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 top-6 pr-6 flex items-center text-xl text-gray-500 hover:text-gray-700"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash  /> : <FaEye />}
                            </button>
                            {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your photo URL"
                                className={`input input-bordered ${errors.photoURL ? 'input-error' : ''}`}
                                {...register("photoURL", {
                                    pattern: {
                                        value: /^(ftp|http|https):\/\/[^ "]+$/,
                                        message: "Invalid URL format (e.g., http://...)"
                                    }
                                })} required
                            />
                            {errors.photoURL && <span className="text-error text-xs mt-1">{errors.photoURL.message}</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-success" disabled={loading}>
                                {loading ? <span className="loading loading-spinner"></span> : "Register"}
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
                            Already have an account? <Link to="/login" className="link link-primary hover:link-secondary">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
