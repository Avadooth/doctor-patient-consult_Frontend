import React, { useState } from 'react';
import axios from 'axios';

const PatientSignup = () => {
  const [formData, setFormData] = useState({
    name: '', age: '', email: '', phone: '', password: '',
    historySurgeries: '', historyIllness: '', profilePic: null
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
    alert('Validating form data...');
    const { name, age, email, phone, password } = formData;

    if (!name || !age || !email || !phone || !password) {
      setErrorMsg('All fields are required.');
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      setErrorMsg('Phone number must be 10 digits.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Invalid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    console.log('Form data:', formData);
    debugger;
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!validateForm()) return;

    

    try {
      setLoading(true);
      await axios.post('https://doctor-patient-consult-backend.onrender.com/api/auth/patient/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMsg('Patient signed up successfully!');
      setFormData({
        name: '', age: '', email: '', phone: '', password: '',
        historySurgeries: '', historyIllness: '', profilePic: null
      });
    } catch (err) {
      alert('Error signing up, please try again.');
      console.error(err);
      setErrorMsg(err.response?.data?.error || 'Signup failed, try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Create an account</h2>
        <p className="text-sm text-gray-600 mb-6">Enter your email below to Create an account</p>

        {errorMsg && <p className="text-red-600 text-sm mb-3">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm mb-3">{successMsg}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name + Age */}
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
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                placeholder="Your age"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                onChange={handleChange}
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
            />
          </div>

          {/* Surgeries */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">History of Surgeries</label>
            <textarea
              name="historySurgeries"
              value={formData.historySurgeries}
              placeholder="Comma separated"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
              onChange={handleChange}
            />
          </div>

          {/* Illness */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">History of Illness</label>
            <textarea
              name="historyIllness"
              value={formData.historyIllness}
              placeholder="Comma separated"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
              onChange={handleChange}
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Picture</label>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white py-2 rounded-md transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'
              }`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientSignup;
