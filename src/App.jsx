import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './utils/AuthRoutes';

import DoctorSignup from './components/Auth/DoctorSignup';
import DoctorLogin from './components/Auth/DoctorLogin';
import PatientSignup from './components/Auth/PatientSignup';
import PatientLogin from './components/Auth/PatientLogin';
import PatientDashboard from './components/Dashboard/PatientDashboard';
import DoctorDashboard from './components/Dashboard/DoctorDashboard';
import ConsultFormWizard from './components/Consultation/ConsultFormWizard';
import PrescriptionList from './components/Prescription/PrescriptionList';
import Home from './pages/Home';

// ✅ This component uses context and navigation safely
const AppContent = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="w-full bg-white py-4 px-6 mb-6 relative">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Health Management System
        </h1>
        {token && (
          <button
            onClick={handleLogout}
            className="absolute right-6 top-4 text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </header>

      <main className="min-h-screen bg-gray-100 flex flex-col items-center px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient/login" element={<PublicRoute role="patient"><PatientLogin /></PublicRoute>} />
          <Route path="/doctor/login" element={<PublicRoute role="doctor"><DoctorLogin /></PublicRoute>} />
          <Route path="/patient/signup" element={<PublicRoute role="patient"><PatientSignup /></PublicRoute>} />
          <Route path="/doctor/signup" element={<PublicRoute role="doctor"><DoctorSignup /></PublicRoute>} />

          <Route path="/patient/dashboard" element={<ProtectedRoute allowedRole="patient"><PatientDashboard /></ProtectedRoute>} />
          <Route path="/doctor/dashboard" element={<ProtectedRoute allowedRole="doctor"><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/consult/:doctorId" element={<ProtectedRoute allowedRole="patient"><ConsultFormWizard /></ProtectedRoute>} />
          <Route path="/prescriptions/:consultId" element={<ProtectedRoute allowedRole="doctor"><PrescriptionList /></ProtectedRoute>} />
        </Routes>
      </main>
    </>
  );
};

// ✅ Safe context usage
const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
