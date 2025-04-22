import React, { useEffect, useState } from 'react';
import './TelemedicineModal.css';

const baseURL = process.env.REACT_APP_API_BASE_URL;

interface Doctor {
  id: number;
  name: string;
  specialization: string;
}

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
}

interface TelemedicineModalProps {
  onClose: () => void;
  role: string | null; // passed from dashboard
}

const TelemedicineModal: React.FC<TelemedicineModalProps> = ({ onClose, role }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');

  const timeSlots = [
    "09:00", "09:30", "10:00",
    "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30",
  ];

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/doctors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error("Failed to fetch patients", err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("role") === 'patient') {
      fetchDoctors();
    } else if (localStorage.getItem("role") === 'doctor') {
      fetchPatients();
    }
  }, [role]);

  const handleStart = async () => {
    const who = role === 'patient' ? `Doctor ID: ${selectedDoctorId}` : `Patient ID: ${selectedPatientId}`;
    alert(`Consultation scheduled with ${who} on ${selectedDate} at ${selectedTime} for: ${reason}`);
    const token = localStorage.getItem("jwtToken");
    let res;
    try {
      if (role === "doctor") {
        res = await fetch(`${baseURL}/appointments?doctorId=${localStorage.getItem("userId")}&paitentId=${selectedPatientId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ date: selectedDate, time: selectedTime, reason: reason, type: "Telemedicine" })
        });
      } else if (role === "patient") {
        res = await fetch(`${baseURL}/appointments?patientId=${localStorage.getItem("userId")}$doctorId=${selectedDoctorId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ date: selectedDate, time: selectedTime, reason: reason, type: "Telemedicine" })
        });
      } else {
        throw new Error("Either doctorId or patientId must be provided.");
      }
    } catch (err) {
      console.error("Error scheuling appointment:", err);
    }

  };

  return (
    <div className="modal-overlay">
      <div className="telemedicine-modal">
        <div className="modal-header">
          <div className="modal-title">
            <span className="icon">📹</span>
            <h2>Telemedicine Consultation</h2>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div className="left-section">
              <label>{role === 'patient' ? 'Select Doctor' : 'Select Patient'}</label>
              <select
                value={role === 'patient' ? selectedDoctorId : selectedPatientId}
                onChange={(e) =>
                  role === 'patient'
                    ? setSelectedDoctorId(e.target.value)
                    : setSelectedPatientId(e.target.value)
                }
              >
                <option value="">-- Select --</option>
                {(role === 'patient' ? doctors : patients).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} {role === 'patient' ? `(${item.specialization})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="right-section">
              <label>Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              <label>Select Time</label>
              <div className="time-grid">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`time-btn ${selectedTime === slot ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="textarea-container">
            <label>Reason for Consultation</label>
            <textarea
              placeholder="Please describe your symptoms or reason for the consultation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="start-btn" onClick={handleStart} disabled={!selectedTime || !selectedDate || (!selectedDoctorId && !selectedPatientId)}>
            Start Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelemedicineModal;
