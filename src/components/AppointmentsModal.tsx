import React, { useEffect, useState } from "react";
import "./MedicalInfoModal.css";
import { X } from "lucide-react";

type Appointment = {
  id: number;
  appointmentDate: string;
  reason: string;
  status: string;
  doctorName: string;
  patientName: string;
};

interface AppointmentsModalProps {
  title: string;
  onClose: () => void;
}

const baseURL = process.env.REACT_APP_API_BASE_URL;
const patientId = localStorage.getItem("userId");
const ITEMS_PER_PAGE = 5;

const AppointmentsModal: React.FC<AppointmentsModalProps> = ({ title, onClose }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const res = await fetch(`${baseURL}/appointments/${patientId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch appointments");

        const appointmentsList = await res.json();
        setAppointments(appointmentsList);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointmentData();
  }, []);

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = appointments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
          <X className="modal-close-btn" onClick={onClose} />
        </div>
        <table className="modal-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Doctor</th>
              <th>Patient</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((a, i) => (
                <tr key={i}>
                  <td>{new Date(a.appointmentDate).toLocaleDateString()}</td>
                  <td>{a.reason}</td>
                  <td>{a.status}</td>
                  <td>{a.doctorName}</td>
                  <td>{a.patientName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">No appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="modal-pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsModal;
