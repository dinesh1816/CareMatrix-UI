import React, { useEffect, useState } from "react";
import "./MedicalInfoModal.css";
import { X } from "lucide-react";

type Appointment = {
  id: number;
  date: string;
  reason: string;
  status: string;
  doctorName: string;
  patientName: string | null;
  meetingLink: string | null;
};

interface AppointmentsModalProps {
  title: string;
  onClose: () => void;
  patientId: string | null;
  doctorId: string | null;
}

const baseURL = process.env.REACT_APP_API_BASE_URL;
const ITEMS_PER_PAGE = 5;
const role = localStorage.getItem("role")

const AppointmentsModal: React.FC<AppointmentsModalProps> = ({ title, onClose, doctorId, patientId }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        let res;

        if (doctorId != null) {
          res = await fetch(`${baseURL}/appointments/doctor/${doctorId}/paginated?page=${currentPage-1}&size=${ITEMS_PER_PAGE}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else if (patientId != null) {
          res = await fetch(`${baseURL}/appointments/patient/${patientId}/paginated?page=${currentPage-1}&size=${ITEMS_PER_PAGE}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          throw new Error("Either doctorId or patientId must be provided.");
        }

        if (!res.ok) throw new Error("Failed to fetch appointments");

        const appointmentsList = await res.json();
        setAppointments(appointmentsList.content); // Set appointment data
        setTotalPages(appointmentsList.totalPages); // Set total pages
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointmentData();
  }, [currentPage, doctorId, patientId]); // Fetch data when page changes

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleCancelAppointment = async (appointmentId: number) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/appointments/${appointmentId}/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.ok) {
        setAppointments(prev => prev.filter(app => app.id !== appointmentId));
        // Optionally: show a success banner here
      } else {
        console.error("Failed to cancel appointment.");
        // Optionally: show error banner here
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
    }
  };
  

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
              <th>Meeting Link</th>
              {role==="doctor" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((a, i) => (
                <tr key={i}>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                  <td>
                  {a.meetingLink ? (
                    <a href={a.meetingLink} target="_blank" rel="noopener noreferrer">
                      Join Meeting
                    </a>
                  ) : (
                    "No link"
                  )}
                  </td>
                  {localStorage.getItem("role") === "doctor" && (
                  <td>
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancelAppointment(a.id)}
                    >
                      Cancel Appointment
                    </button>
                  </td>
                )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">No appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="modal-pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsModal;
