import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PrescriptionList = () => {
  const { consultId } = useParams();
  const [care, setCare] = useState('');
  const [medicines, setMedicines] = useState('');
  const [existing, setExisting] = useState(null);

  useEffect(() => {
    axios.get(`/api/prescriptions/doctor/${localStorage.getItem('doctorId')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      const presc = res.data.find(p => p.consult._id === consultId);
      if (presc) {
        setCare(presc.care);
        setMedicines(presc.medicines);
        setExisting(presc);
      }
    })
    .catch(err => console.error(err));
  }, [consultId]);

  const handleSubmit = async () => {
    try {
      const payload = {
        consult: consultId,
        doctor: localStorage.getItem('doctorId'),
        patient: existing?.patient._id || '', // optional, backend may populate
        care,
        medicines
      };

      if (existing) {
        await axios.put(`/api/prescriptions/${existing._id}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post('/api/prescriptions', payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }

      alert('Prescription saved and PDF generated.');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save prescription');
    }
  };

  return (
    <div>
      <h2>Write/Edit Prescription</h2>
      <textarea placeholder="Care to be taken" value={care} onChange={(e) => setCare(e.target.value)} required />
      <textarea placeholder="Medicines" value={medicines} onChange={(e) => setMedicines(e.target.value)} />
      <button onClick={handleSubmit}>Save Prescription</button>
    </div>
  );
};

export default PrescriptionList;
