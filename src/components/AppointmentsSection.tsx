import React from "react";
import "./AppointmentsSection.css";
import { Calendar, Clock } from "lucide-react";

type Appointment = {
  id: number;
  appointmentDate: string;
  reason: string;
  status: string; // "Telemedicine" | "In-person"
  doctorName: string;
};

type Props = {
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
};

const AppointmentsSection: React.FC<Props> = ({
  upcomingAppointments,
  pastAppointments,
}) => {
  return (
    <div className="appointments-container">
      {/* Upcoming Appointments */}
      <div className="appointment-box">
        <h2 className="section-title">Upcoming Appointments</h2>
        {upcomingAppointments.length ? (
          upcomingAppointments.map((a) => (
            <div key={a.id} className="appointment-card">
              <p className="patient-name">{a.doctorName}</p>
              <p>
                <Calendar className="icon" size={16} />
                {new Date(a.appointmentDate).toLocaleDateString()}
              </p>
              <p>
                <Clock className="icon" size={16} />
                {new Date(a.appointmentDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>{a.reason}</p>
              <span
                className={`badge ${
                  a.status.toLowerCase() === "telemedicine"
                    ? "telemedicine"
                    : "in-person"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))
        ) : (
          <p className="no-appointments">No upcoming appointments</p>
        )}
      </div>

      {/* Past Appointments */}
      <div className="appointment-box">
        <h2 className="section-title">Past Appointments</h2>
        {pastAppointments.length ? (
          pastAppointments.map((a) => (
            <div key={a.id} className="appointment-card">
              <p className="patient-name">{a.doctorName}</p>
              <p>
                <Calendar className="icon" size={16} />
                {new Date(a.appointmentDate).toLocaleDateString()}
              </p>
              <p>
                <Clock className="icon" size={16} />
                {new Date(a.appointmentDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>{a.reason}</p>
              <span
                className={`badge ${
                  a.status.toLowerCase() === "telemedicine"
                    ? "telemedicine"
                    : "in-person"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))
        ) : (
          <p className="no-appointments">No past appointments</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentsSection;
