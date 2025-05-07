import React, { useEffect, useState } from 'react';
import { Video } from "lucide-react";
import './TelemedicineModal.css';

const baseURL = process.env.REACT_APP_API_BASE_URL || "";

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
  role: string | null;
}

const TelemedicineModal: React.FC<TelemedicineModalProps> = ({ onClose, role }) => {
  const [appointmentType, setAppointmentType] = useState("");
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);  
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

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

  const fetchAvailableSlots = async (date: string) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];

    // Replace with real API when available
    const mockAvailability: { [key: string]: string[] } = {
      "2025-05-06": ["09:00", "10:30", "15:00"],
      "2025-05-07": ["11:00", "14:30", "16:00"],
    };

    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(mockAvailability[formattedDate] || []);
      }, 300);
    });
  };

  const handleSlotClick = (slot: string) => {
    setSelectedTime(slot);
  };

  useEffect(() => {
    if (role === 'patient') fetchDoctors();
    else if (role === 'doctor') fetchPatients();
  }, [role]);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate).then(setAvailableSlots);
    }
  }, [selectedDate]);

  const handleStart = async () => {
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("userId");
    const normalizedRole = role?.toLowerCase();
    const [year, month, day] = selectedDate.split("-");
    const formattedDate = `${month}-${day}-${year}`;

    const query =
      normalizedRole === "doctor"
        ? `doctorId=${userId}&patientId=${selectedPatientId}`
        : `patientId=${userId}&doctorId=${selectedDoctorId}`;

    try {
      const res = await fetch(`${baseURL}/appointments/create?${query}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: formattedDate,
          time: selectedTime,
          reason,
          type: "Telemedicine"
        })
      });

      if (res.ok) {
        alert("Telemedicine appointment scheduled successfully!");
        onClose();
      } else {
        const errorText = await res.text();
        console.error("Failed to schedule:", res.status, errorText);
        alert("Failed to schedule appointment: " + errorText);
      }
    } catch (err) {
      console.error("Network or server error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="telemedicine-modal">
        <div className="modal-header">
          <div className="modal-title">
            <Video />
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
                    {item.name} {role === 'patient' && 'specialization' in item ? `(${item.specialization})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <label>Select Appointment type</label>
            <select value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)}>
              <option value="Telemedicine">Telemedicine</option>
              <option value="In-person">In-person</option>
            </select>
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
                    disabled={!availableSlots.includes(slot)}
                    className={`time-btn ${selectedTime === slot ? 'selected' : ''} ${!availableSlots.includes(slot) ? 'disabled' : ''}`}
                    onClick={() => availableSlots.includes(slot) && handleSlotClick(slot)}
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
          <button
            className="start-btn"
            onClick={handleStart}
            disabled={!selectedTime || !selectedDate || (!selectedDoctorId && !selectedPatientId)}
          >
            Start Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelemedicineModal;
