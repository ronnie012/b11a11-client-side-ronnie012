import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config"; // Import the initialized Firebase app
import { toast } from 'react-toastify'; // Import toast

export const AuthContext = createContext(null);

const auth = getAuth(app); // Get the Auth instance
const googleProvider = new GoogleAuthProvider(); // Google Auth Provider
// Base URL for your API. Adjust if your server is deployed elsewhere or not set in .env.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading status
    const [authError, setAuthError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));

    // Function to clear auth error
    const clearAuthError = () => {
        setAuthError(null);
        setLoading(false); // Also reset loading if an error was being shown
    };

    // Function to fetch JWT from server and store it
    const fetchAndStoreToken = async (firebaseUser) => {
        if (!firebaseUser || !firebaseUser.email) return;
        // setLoading(true); // setLoading is handled by onAuthStateChanged or calling functions
        try {
            const idToken = await firebaseUser.getIdToken(true); // Get Firebase ID token (true forces refresh)
            // console.log("Firebase ID Token (from AuthContext):", idToken); // Checking Firebase ID Token to test
            const response = await axios.post(`${API_BASE_URL}/auth/firebase-login`, { idToken }); // Send ID token to backend
            const receivedToken = response.data.token;
            localStorage.setItem('authToken', receivedToken);
            setToken(receivedToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`; // Set for future axios requests
        } catch (error) {
            console.error("Failed to fetch JWT:", error);
            const errorMessage = error.response?.data?.message || "Failed to authenticate with the server. Please try logging in again.";
            setAuthError(errorMessage);
            toast.error(errorMessage); // Show error to the user
            // Handle token fetch error (e.g., show a message to the user)
            // Optionally, sign out the user if token fetch fails critically
            // await signOut(auth); // This would trigger onAuthStateChanged to clear local state
        }
    };

    // 1. Create User with Email and Password
    const createUser = async (email, password) => {
        setLoading(true);
        setAuthError(null);
        try {
            return createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error creating user:", error);
            setAuthError(error.message);
            setLoading(false);
            throw error; // Re-throw to be caught by the caller
        }
    };

    // 2. Sign In with Email and Password
    const signIn = async (email, password) => {
        setLoading(true);
        setAuthError(null);
        try {
            return signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error signing in:", error);
            setAuthError(error.message);
            setLoading(false);
            throw error; // Re-throw
        }
    };

    // 3. Sign In with Google
    const signInWithGoogle = async () => {
        setLoading(true);
        setAuthError(null);
        try {
            return signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error with Google sign-in:", error);
            setAuthError(error.message);
            setLoading(false);
            throw error; // Re-throw
        }
    };

    // Observe Auth State Change (Crucial for persistence)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log('Current User:', currentUser); // Log user state change
            if (currentUser) {
                fetchAndStoreToken(currentUser);
            } else {
                // User is signed out
                localStorage.removeItem('authToken');
                setToken(null);
                delete axios.defaults.headers.common['Authorization'];
                // console.log("User is signed out, token cleared.");
            }
            setLoading(false); // Set loading to false once state is determined
        });

        // Cleanup subscription on unmount
        return () => {
            unsubscribe();
        };
    }, []); // Empty dependency array means this runs only once on mount

    // Effect to set Axios default header if token exists on initial load
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            // Ensure header is removed if token is not present (e.g. after logout and page refresh)
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // 4. Update User Profile (Name and Photo URL)
    const updateUserProfile = async (name, photoURL) => {
        setLoading(true);
        setAuthError(null);
        try {
            await updateProfile(auth.currentUser, {
                displayName: name, photoURL: photoURL
            });
            // Manually update the user state if needed, as onAuthStateChanged might not pick up profile changes immediately
            setUser(prevUser => ({...prevUser, displayName: name, photoURL: photoURL}));
            // Re-fetch the custom JWT if profile information is part of its payload and user is still logged in
            if (auth.currentUser) {
                await fetchAndStoreToken(auth.currentUser);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            setAuthError(error.message);
            setLoading(false);
            throw error; // Re-throw
        }
    };

    // 5. Logout
    const logout = async () => {
        setLoading(true);
        setAuthError(null);
        try {
            localStorage.removeItem('authToken');
            setToken(null);
            delete axios.defaults.headers.common['Authorization'];
            await signOut(auth); // Wait for signOut to complete
            toast.success("Logged out successfully!"); // Show success toast
            // setLoading(false); // setLoading is already handled by onAuthStateChanged
            // No need to return signOut(auth) directly if you handle success/error here
            // and onAuthStateChanged will update user state.
        } catch (error) {
            console.error("Error signing out:", error);
            setAuthError(error.message);
            setLoading(false);
            throw error; // Re-throw
        }
    };

    const authInfo = {
        user,
        loading,
        token, // Expose token
        createUser,
        signIn,
        signInWithGoogle,
        updateUserProfile,
        logout,
        authError,
        clearAuthError,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
