import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify'; // Changed to react-toastify

const LoginForm = () => {
    const { signIn, signInWithGoogle, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

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
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
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
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
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
                <button onClick={handleGoogleSignIn} className="btn btn-outline btn-accent w-full mb-2" disabled={loading}>
                    <FaGoogle className="mr-2" /> Continue with Google
                </button>
                <p className="text-sm">
                    Don't have an account? <Link to="/register" className="link link-primary">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;