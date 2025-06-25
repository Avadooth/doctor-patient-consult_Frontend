import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const PatientLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const validateForm = () => {
        if (!email || !password) {
            setErrorMsg('Email and password are required.');
            return false;
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setErrorMsg('Please enter a valid email address.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (!validateForm()) return;

        try {
            setLoading(true);
            const res = await axios.post('/api/auth/patient/login', { email, password });

            // Save token and navigate
            login(res.data.token, 'patient');
            setSuccessMsg('Login successful! Redirecting...');
            setTimeout(() => navigate('/patient/dashboard', { replace: true }), 1000);
        } catch (err) {
            setErrorMsg(err.response?.data?.error || 'Login failed, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="bg-white rounded-lg shadow-md px-10 py-12 w-full max-w-xl">
                    <div className="w-full"> {/* Removed max-w-md */}

                        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Login to your account</h2>
                        <span className="block text-center text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full mb-6">
                            Patient Login
                        </span>

                        {errorMsg && <p className="text-red-600 text-sm mb-3 text-center">{errorMsg}</p>}
                        {successMsg && <p className="text-green-600 text-sm mb-3 text-center">{successMsg}</p>}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-black text-white py-3 rounded-md text-sm transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'}`}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            Don’t have an account?{' '}
                            <button
                                onClick={() => navigate('/patient/signup')}
                                className="text-black font-medium hover:underline"
                            >
                                Sign up
                            </button>
                        </p>

                        <p className="text-center text-xs text-gray-400 mt-2">
                            <button
                                onClick={() => navigate('/doctor/login')}
                                className="underline hover:text-black"
                            >
                                Login as Doctor
                            </button>
                        </p>
                    </div>
                </div>
            </div>

        </>

    );
};

export default PatientLogin;
