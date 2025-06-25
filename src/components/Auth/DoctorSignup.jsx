import React, { useState } from 'react';
import axios from 'axios';

const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    email: '',
    phone: '',
    experience: '',
    password: '',
    profilePic: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePic') {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const { name, specialty, email, phone, experience, password } = formData;
    if (!name || !specialty || !email || !phone || !experience || !password) {
      setErrorMsg('Please fill in all required fields.');
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return false;
    }
    if (isNaN(experience) || Number(experience) < 0) {
      setErrorMsg('Experience must be a valid number.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));

    try {
      setLoading(true);
       await axios.post('/api/auth/doctor/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMsg('Doctor signed up successfully!');
      setFormData({
        name: '',
        specialty: '',
        email: '',
        phone: '',
        experience: '',
        password: '',
        profilePic: null,
      });
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Create an account</h2>
        <p className="text-sm text-gray-600 mb-6">Enter your email below to create an account</p>

        {errorMsg && <p className="text-red-600 text-sm mb-3">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm mb-3">{successMsg}</p>}

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Name + Specialty */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                placeholder="Your specialty"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Phone + Email */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                placeholder="Phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="m@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
              onChange={handleChange}
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">experience (in years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              min="0"
              placeholder="e.g. 5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
              onChange={handleChange}
              required
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:bg-gray-100 file:text-gray-700 file:font-semibold
                hover:file:bg-gray-200"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white py-2 rounded-md transition ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'
            }`}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignup;
