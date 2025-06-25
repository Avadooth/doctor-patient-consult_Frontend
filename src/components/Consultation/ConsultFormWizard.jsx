import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ConsultFormWizard = () => {
  const { doctorId } = useParams();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    step1: { illness: '', recentSurgery: '' },
    step2: { diabetic: '', allergies: '', others: '' },
    payment: { transactionId: '' }
  });

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [section]: { ...prev[section], [name]: value }
    }));
  };

  const validateStep = () => {
    const currentStepData = step === 1 ? form.step1 : step === 2 ? form.step2 : form.payment;
    const newErrors = {};

    for (const key in currentStepData) {
      if (!currentStepData[key]) {
        newErrors[key] = 'This field is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    debugger;
    if (!validateStep()) return;

    const patientId = localStorage.getItem('patientId');
    const payload = {
      ...form,
      patient: patientId,
      doctor: doctorId
    };

    try {
      await axios.post('https://doctor-patient-consult-backend.onrender.com/api/consults', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Consultation submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Submission failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Consultation Form </h2>

        <form className="space-y-6">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div>
                <label className="block mb-1 font-medium">Current Illness History</label>
                <input
                  type="text"
                  name="illness"
                  value={form.step1.illness}
                  onChange={(e) => handleChange(e, 'step1')}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.illness && <p className="text-red-600 text-sm">{errors.illness}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium">Recent Surgery (with time)</label>
                <input
                  type="text"
                  name="recentSurgery"
                  value={form.step1.recentSurgery}
                  onChange={(e) => handleChange(e, 'step1')}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.recentSurgery && <p className="text-red-600 text-sm">{errors.recentSurgery}</p>}
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div>
                <label className="block mb-1 font-medium">Diabetic Status</label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="diabetic"
                      value="true"
                      checked={form.step2.diabetic === 'true'}
                      onChange={(e) => handleChange(e, 'step2')}
                    />{' '}
                    Diabetic
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="diabetic"
                      value="false"
                      checked={form.step2.diabetic === 'false'}
                      onChange={(e) => handleChange(e, 'step2')}
                    />{' '}
                    Non-Diabetic
                  </label>
                </div>
                {errors.diabetic && <p className="text-red-600 text-sm">{errors.diabetic}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium">Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  value={form.step2.allergies}
                  onChange={(e) => handleChange(e, 'step2')}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.allergies && <p className="text-red-600 text-sm">{errors.allergies}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium">Other Family History</label>
                <input
                  type="text"
                  name="others"
                  value={form.step2.others}
                  onChange={(e) => handleChange(e, 'step2')}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.others && <p className="text-red-600 text-sm">{errors.others}</p>}
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="flex justify-center">
                <img src="/qr-placeholder.png" alt="QR Code" width="150" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Transaction ID</label>
                <input
                  type="text"
                  name="transactionId"
                  value={form.payment.transactionId}
                  onChange={(e) => handleChange(e, 'payment')}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {errors.transactionId && <p className="text-red-600 text-sm">{errors.transactionId}</p>}
              </div>
            </>
          )}
        </form>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultFormWizard;
