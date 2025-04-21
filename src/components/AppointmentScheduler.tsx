// AppointmentScheduler.tsx
import React, { useEffect, useState } from 'react';
import './AppointmentScheduler.css';

interface AppointmentSchedulerProps {
  onClose: () => void;
}

type Doctor = {
  id: string;
  name: string;
  department: string;
};

type Patient = {
  id: string;
  name: string;
  age: number;
};

const baseURL = process.env.REACT_APP_API_BASE_URL;

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ onClose }) => {
  const userRole = localStorage.getItem("role");
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("jwtToken");
      const endpoint = userRole === "patient" ? "/doctors" : "/patients";
      const response = await fetch(`${baseURL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (userRole === "patient") setDoctors(data);
      else setPatients(data);
    };

    fetchUsers();
  }, [userRole]);

  const handleSchedule = async () => {
    const token = localStorage.getItem("jwtToken");

    const payload = {
      date: selectedDate,
      time: selectedTime,
      reason,
      doctorId: userRole === "patient" ? selectedDoctorId : localStorage.getItem("userId"),
      patientId: userRole === "doctor" ? selectedPatientId : localStorage.getItem("userId"),
    };

    const who = userRole === 'patient' ? `Doctor ID: ${selectedDoctorId}` : `Patient ID: ${selectedPatientId}`;
    alert(`Consultation scheduled with ${who} on ${selectedDate} at ${selectedTime} for: ${reason}`);
    let res;
    try {
      if (userRole === "doctor") {
        res = await fetch(`${baseURL}/appointments?doctorId=${localStorage.getItem("userId")}&paitentId=${selectedPatientId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ date: selectedDate, time: selectedTime, reason: reason, type: "Telemedicine" })
        });
      } else if (userRole === "patient") {
        res = await fetch(`${baseURL}/appointments?patientId=${localStorage.getItem("userId")}$doctorId=${selectedDoctorId}`, {
          method: "GET",
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
            <span className="icon">📅</span>
            <h2>Schedule Appointment</h2>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div className="left-section">
              <label>{userRole === "patient" ? "Select Doctor" : "Select Patient"}</label>
              <select
                value={userRole === "patient" ? selectedDoctorId : selectedPatientId}
                onChange={(e) => userRole === "patient" ? setSelectedDoctorId(e.target.value) : setSelectedPatientId(e.target.value)}
              >
                <option value="">-- Select --</option>
                {(userRole === "patient" ? doctors : patients).map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="right-section">
              <label>Select Date</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

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
            <label>Reason for Appointment</label>
            <textarea
              placeholder="Please describe the reason for the appointment..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="start-btn" onClick={handleSchedule}>Confirm Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
