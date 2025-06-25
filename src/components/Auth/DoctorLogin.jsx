import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
  const navigate = useNavigate();
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
      const res = await axios.post('/api/auth/doctor/login', { email, password });

      // Save token and navigate
      localStorage.setItem('token', res.data.token);
      setSuccessMsg('Login successful! Redirecting...');
      setTimeout(() => navigate('/doctor/dashboard'), 1000);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Login failed, please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Login to your account</h2>
          <p className="text-sm text-gray-600 mb-6">Enter your email below to login to your account</p>
          {errorMsg && <p className="text-red-600 text-sm mb-3">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 text-sm mb-3">{successMsg}</p>}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                placeholder="m@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black text-sm"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black text-white py-2 rounded-md transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'
                }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{' '}
            <button
              onClick={() => navigate('/doctor/signup')}
              className="text-black font-medium hover:underline"
            >
              Sign up
            </button>
          </p>


        </div>
      </div>
    </>
  );
};

export default DoctorLogin;
