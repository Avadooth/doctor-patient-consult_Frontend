import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardGrid from '../UI/CardGrid';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/doctors')
      .then(res => setDoctors(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleConsult = (doctorId) => {
    navigate(`/consult/${doctorId}`);
  };

  return (
    <div>
      <h2>Available Doctors</h2>
      <CardGrid data={doctors} onButtonClick={handleConsult} buttonLabel="Consult" />
    </div>
  );
};

export default PatientDashboard;
