import React, { useEffect, useState } from "react";
import "./MedicalInfoModal.css";
import Banner from './Banner';
import { X } from "lucide-react";

type Appointment = {
  id: number;
  date: string;
  time: string;
  reason: string;
  status: string;
  doctorName: string;
  patientName: string | null;
  meetingLink: string | null;
  type: string;
};

interface AppointmentsModalProps {
  title: string;
  onClose: () => void;
  patientId: string | null;
  doctorId: string | null;
  appointmentType: "upcoming" | "past";
}

const baseURL = process.env.REACT_APP_API_BASE_URL;
const ITEMS_PER_PAGE = 5;
const role = localStorage.getItem("role");

const AppointmentsModal: React.FC<AppointmentsModalProps> = ({ 
  title, 
  onClose, 
  doctorId, 
  patientId,
  appointmentType 
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [banner, setBanner] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAppointmentData = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      let res;
      const endpoint = appointmentType === "upcoming" ? "upcoming" : "past";

      if (doctorId != null) {
        res = await fetch(`${baseURL}/appointments/doctor/${doctorId}?appointmentTimeType=${appointmentType}&page=${currentPage-1}&size=${ITEMS_PER_PAGE}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (patientId != null) {
        res = await fetch(`${baseURL}/appointments/patient/${patientId}?appointmentTimeType=${appointmentType}&page=${currentPage-1}&size=${ITEMS_PER_PAGE}`, {
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
      setAppointments(appointmentsList.content);
      setTotalPages(appointmentsList.totalPages);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };
  
  useEffect(() => {
    fetchAppointmentData();
  }, [currentPage, doctorId, patientId, appointmentType]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleCancelAppointment = async (appointmentId: number) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const doctorId = localStorage.getItem("userId");
      
      const res = await fetch(`${baseURL}/appointments/${appointmentId}/cancel?doctorId=${doctorId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.ok) {
        setBanner({ message: 'Appointment Cancelled successfully', type: 'success' });
        fetchAppointmentData();
      } else {
        const errorText = await res.text();
        console.error("Failed to cancel appointment:", errorText);
        setBanner({ message: 'Failed to cancel appointment', type: 'error' });
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      setBanner({ message: 'An error occurred while cancelling the appointment', type: 'error' });
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
              <th>Time</th>
              <th>Type</th>
              {appointmentType === "upcoming" && <th>Meeting Link</th>}
              {role === "doctor" && appointmentType === "upcoming" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((a, i) => (
                <tr key={i}>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                  <td>{a.time}</td>
                  <td>
                      {a.type}
                  </td>
                  {appointmentType === "upcoming" && (
                    <td>
                      {a.meetingLink ? (
                        <a href={a.meetingLink} target="_blank" rel="noopener noreferrer">
                          Join Meeting
                        </a>
                      ) : (
                        "No link"
                      )}
                    </td>
                  )}
                  {role === "doctor" && appointmentType === "upcoming" && (
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
                <td colSpan={appointmentType === "upcoming" ? 6 : 4} className="text-center">No appointments found.</td>
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
      {banner && (
        <Banner
          message={banner.message}
          type={banner.type}
          onClose={() => setBanner(null)}
        />
      )}
    </div>
  );
};

export default AppointmentsModal;
