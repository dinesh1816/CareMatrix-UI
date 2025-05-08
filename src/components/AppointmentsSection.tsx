import React from "react";
import "./AppointmentsSection.css";
import { Calendar, Clock } from "lucide-react";

type Appointment = {
  date: string;
  time: string;
  reason: string;
  type: string;
  link: string;
};

type Props = {
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  onUpcomingClick: () => void;
  onPastClick: () => void;
};

const AppointmentsSection: React.FC<Props> = ({
  upcomingAppointments,
  pastAppointments,
  onUpcomingClick,
  onPastClick,
}) => {
  return (
    <div className="appointments-container">
      {/* Upcoming Appointments */}
      <div className="appointment-box" onClick={onUpcomingClick}>
        <h2 className="section-title">Upcoming Appointments</h2>
        {upcomingAppointments.length ? (
          upcomingAppointments.map((a) => (
            <div key={a.reason} className="appointment-card">
              {/* <p className="patient-name">{a.time}</p> */}
              <p>
                <Calendar className="icon" size={16} />
                {new Date(a.date).toLocaleDateString()}
              </p>
              <p>
                <Clock className="icon" size={16} />
                {new Date(a.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>{a.reason}</p>
              <span
                className={`badge ${
                  a.type.toLowerCase() === "telemedicine"
                    ? "telemedicine"
                    : "in-person"
                }`}
              >
                {a.type}
              </span>
            </div>
          ))
        ) : (
          <p className="no-appointments">No upcoming appointments</p>
        )}
      </div>

      {/* Past Appointments */}
      <div className="appointment-box" onClick={onPastClick}>
        <h2 className="section-title">Past Appointments</h2>
        {pastAppointments.length ? (
          pastAppointments.map((a) => (
            <div key={a.reason} className="appointment-card">
              {/* <p className="patient-name">{a.time}</p> */}
              <p>
                <Calendar className="icon" size={16} />
                {new Date(a.date).toLocaleDateString()}
              </p>
              <p>
                <Clock className="icon" size={16} />
                {new Date(a.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>{a.reason}</p>
              <span
                className={`badge ${
                  a.type.toLowerCase() === "telemedicine"
                    ? "telemedicine"
                    : "in-person"
                }`}
              >
                {a.type}
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
