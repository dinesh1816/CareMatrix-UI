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

interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

interface TelemedicineModalProps {
  onClose: () => void;
  role: string | null;
}

const TelemedicineModal: React.FC<TelemedicineModalProps> = ({ onClose, role }) => {
  const [appointmentType, setAppointmentType] = useState("Telemedicine");
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);  
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  // If not a doctor, close the modal
  useEffect(() => {
    if (role !== "doctor") {
      onClose();
    }
  }, [role, onClose]);

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
    try {
      const token = localStorage.getItem("jwtToken");
      const userId = localStorage.getItem("userId");
      const formattedDate = new Date(date).toISOString().split("T")[0];
      
      if (!userId || !selectedPatientId) {
        setAvailableSlots([]);
        return;
      }

      const res = await fetch(
        `${baseURL}/appointments/doctor/${userId}/patient/${selectedPatientId}/available-slots?date=${formattedDate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch available slots");
      
      const data = await res.json();
      setAvailableSlots(data);
    } catch (err) {
      console.error("Error fetching available slots:", err);
      setAvailableSlots([]);
    }
  };

  const handleSlotClick = (slot: TimeSlot) => {
    setSelectedTime(slot.startTime);
  };

  useEffect(() => {
    if (role === 'doctor') {
      fetchPatients();
    }
  }, [role]);

  useEffect(() => {
    if (selectedDate && selectedPatientId) {
      fetchAvailableSlots(selectedDate);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, selectedPatientId]);

  const handleStart = async () => {
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("userId");
    const [year, month, day] = selectedDate.split("-");
    const formattedDate = `${month}-${day}-${year}`;

    // Format time to HH:mm
    const formattedTime = selectedTime.split(":")[0] + ":" + selectedTime.split(":")[1];

    try {
      const res = await fetch(`${baseURL}/appointments/create?doctorId=${userId}&patientId=${selectedPatientId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: formattedDate,
          time: formattedTime,
          reason,
          type: appointmentType
        })
      });

      if (res.ok) {
        alert("Appointment scheduled successfully!");
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

  // If not a doctor, don't render the modal
  if (role !== "doctor") {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="telemedicine-modal">
        <div className="modal-header">
          <div className="modal-title">
            <Video />
            <h2>Schedule Appointment</h2>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div className="left-section">
              <label>Select Patient</label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
              >
                <option value="">-- Select --</option>
                {patients.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
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
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    disabled={!slot.available}
                    className={`time-btn ${selectedTime === slot.startTime ? 'selected' : ''} ${!slot.available ? 'disabled' : ''}`}
                    onClick={() => slot.available && handleSlotClick(slot)}
                  >
                    {slot.startTime}
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
            disabled={!selectedTime || !selectedDate || !selectedPatientId}
          >
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelemedicineModal;
