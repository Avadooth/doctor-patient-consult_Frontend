import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
  const [consults, setConsults] = useState([]);
  const doctorId = localStorage.getItem('doctorId'); // or decode JWT

  useEffect(() => {
    axios.get(`https://doctor-patient-consult-backend.onrender.com/api/consults/doctor/${doctorId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setConsults(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Your Consultations</h2>
      {consults.map(c => (
        <div key={c._id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
          <p><strong>Patient:</strong> {c.patient.name}</p>
          <p><strong>Illness:</strong> {c.step1.illness}</p>
          <a href={`/prescriptions/${c._id}`}>Write/Edit Prescription</a>
        </div>
      ))}
    </div>
  );
};

export default DoctorDashboard;
