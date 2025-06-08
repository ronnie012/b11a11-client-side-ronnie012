import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import FaGoogle
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify'; // Changed to react-toastify

const RegisterForm = () => { // Added signInWithGoogle
    const { createUser, updateUserProfile, signInWithGoogle, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [registerError, setRegisterError] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoURL = form.photoURL.value;

        setRegisterError(''); // Clear previous errors

        // Password validation
        if (password.length < 6) {
            setRegisterError('Password must be at least 6 characters long.');
            toast.error('Password must be at least 6 characters long.');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password must contain at least one uppercase letter.');
            toast.error('Password must contain at least one uppercase letter.');
            return;
        } else if (!/[a-z]/.test(password)) {
            setRegisterError('Password must contain at least one lowercase letter.');
            toast.error('Password must contain at least one lowercase letter.');
            return;
        }

        try {
            await createUser(email, password);
            // Create user with email and password
            // const result = await createUser(email, password);
            // const loggedUser = result.user;
            // console.log(loggedUser);

            // Update profile with name and photo URL
            await updateUserProfile(name, photoURL);
            toast.success('Registration successful!');
            navigate('/'); // Redirect to homepage after registration

        } catch (error) {
            console.error("Registration error:", error);
            setRegisterError(error.message);
            toast.error(error.message || 'Registration failed. Please try again.');
        }
    };

    // Handle Google Sign-In for Registration
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
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" name="photoURL" placeholder="Photo URL" className="input input-bordered" />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="password"
                        className="input input-bordered pr-10"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-500"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {registerError && <p className="text-red-600 text-sm mt-2">{registerError}</p>}
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : "Register"}
                    </button>
                </div>
            </form>
            <div className="divider px-8">OR</div>
            <div className="p-4 pt-0 text-center"> {/* Added Google Sign-In button */}
                <button onClick={handleGoogleSignIn} className="btn btn-outline btn-accent w-full mb-2" disabled={loading}>
                    <FaGoogle className="mr-2" /> Continue with Google
                </button>
                
                <p className="text-sm">
                    Already have an account? <Link to="/login" className="link link-primary">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;