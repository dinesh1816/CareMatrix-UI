import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";
import AppointmentScheduler from "./AppointmentScheduler";
import AppointmentsSection from "./AppointmentsSection";
import TelemedicineModal from "./TelemedicineModal";
import { ProfileModal } from "./ProfileModal";
import AllergyModal from "./AllergyModal";
import ConditionModal from "./ConditionModal";
import InsuranceModal from "./InsuranceModal";
import PrescriptionModal from "./PrescriptionModal";
import SurgeryModal from "./SurgeryModal";
import AppointmentsModal from "./AppointmentsModal";
import AddInsuranceModal from "./AddInsuranceModal";
import { UserCircle2, LogOut, Calendar, Video, Plus } from "lucide-react";

const patientId = 2;
const baseURL = process.env.REACT_APP_API_BASE_URL;

type Appointment = {
  id: number;
  appointmentDate: string;
  reason: string;
  status: string;
  doctorName: string;
};

type Allergy = {
  allergyName: string;
  severity: string;
};

type Condition = {
  conditionName: string;
  createdAt: string;
  status: string;
};

type Prescription = {
  medication: string;
  dosage: string;
  frequency: string;
  instructions: string;
  prescribedDate: string;
};

type Insurance = {
  providerName: string;
  policyNumber: string;
  expireDate: string;
  coverage: string;
  updatedAt: string;
};

type Surgery = {
  surgeryName: string;
  surgeryDate: string;
  surgeryHospital: string;
};

type PatientProfile = {
  username: string;
  email: string;
  uniqueId: string | number;
  age: number;
  gender: string;
  dateOfBirth: string;
  contact: string;
  address: string;
  bloodGroup: string;
};

const PatientDashboard = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [addInsurance, setAddInsurance] = useState<Insurance[]>([]);
  const [latestInsurance, setLatestInsurance] = useState<Insurance | null>(null);
  const [latestPrescriptions, setLatestPrescriptions] = useState<Prescription[]>([]);
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showAppointmentScheduler, setShowAppointmentScheduler] = useState(false);
  const [showTelemedicineModal, setShowTelemedicineModal] = useState(false);

  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showSurgeryModal, setShowSurgeryModal] = useState(false);
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);

  const [showAddInsuranceModal, setShowAddInsuranceModal] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      await fetch(`${baseURL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      localStorage.removeItem("jwtToken");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Try again.");
    }
  };

  const fetchPatientProfile = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patients/${patientId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const user = await res.json();
      setPatientProfile(user);
    } catch (err) {
      setPatientProfile({
        username: "dinesh",
        email: "dinesh@example.com",
        uniqueId: 2,
        age: 25,
        gender: "male",
        dateOfBirth: "july 21 2000",
        contact: "9452686045",
        address: "corpus christi",
        bloodGroup: "o+"
      });
      console.error("Error fetching profile:", err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patient/appointments/${patientId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch appointments");

      const data = await res.json();
      setUpcomingAppointments(data.upcomingAppointments || []);
      setPastAppointments(data.pastAppointments || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const fetchPatientAllergies = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patient/allergies/${patientId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch allergies");

      const data = await res.json();
      setAllergies(data || []);
    } catch (err) {
      console.error("Error fetching allergies:", err);
    }
  };

  const fetchPatientInsurance = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patient/insurance/${patientId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch insurance");

      const data = await res.json();
      setLatestInsurance(data || null);
    } catch (err) {
      console.error("Error fetching insurance:", err);
    }
  };

  const fetchPatientCondition = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patient/conditions/${patientId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch conditions");

      const data = await res.json();
      setConditions(data || []);
    } catch (err) {
      console.error("Error fetching conditions:", err);
    }
  };

  const fetchPatientPriscription = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patient/prescriptions/${patientId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch prescriptions");

      const data = await res.json();
      setLatestPrescriptions(data || []);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
    }
  };

  const fetchDashboardData = async () => {
    fetchPatientProfile();
    fetchAppointments();
    fetchPatientAllergies();
    fetchPatientInsurance();
    fetchPatientCondition();
    fetchPatientPriscription();
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const handleAddInsurance = async (allergy: { providerName: string; policyNumber: string; expireDate: string; coverage: string; updateAt: string; notes?: string }) => {
    try {
      const token = localStorage.getItem("jwtToken");
  
      const res = await fetch(`${baseURL}/patient/insurance/${patientId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allergy),
      });
  
      if (!res.ok) throw new Error("Failed to add allergy");
  
      const newInsurance = await res.json();
      setAddInsurance((prev) => [...prev, newInsurance]);
    } catch (err) {
      console.error("Error adding allergy:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h1>Welcome, {patientProfile?.username || "Patient"}</h1>
        <button onClick={() => setShowTelemedicineModal(true)} className="telemedicine-btn">
          <Video />Telemedicine Consultation
        </button>
        {showTelemedicineModal && <TelemedicineModal onClose={() => setShowTelemedicineModal(false)} />}
        <button onClick={() => setShowAppointmentScheduler(true)} className="appointment-btn">
          <Calendar />Schedule Appointment
        </button>
        {showAppointmentScheduler && <AppointmentScheduler onClose={() => setShowAppointmentScheduler(false)} />}
        <div className="icons">
          <UserCircle2 className="icon" onClick={() => setShowProfile(!showProfile)} />
          {showProfile && patientProfile && <ProfileModal user={patientProfile} onClose={() => setShowProfile(false)} />}
          <LogOut className="icon" onClick={handleLogout} />
        </div>
      </div>

      <div onClick={() => setShowAppointmentsModal(true)}>
        <AppointmentsSection upcomingAppointments={upcomingAppointments} pastAppointments={pastAppointments} />
      </div>

      <div className="patient-grid-layout">
        <div className="card wide-card">
          <h2 onClick={() => setShowAllergyModal(true)}>Allergies</h2>
          <div className="allergy-list">
            {allergies.length ? (
              allergies.map((a, i) => <p key={i}>{a.allergyName} – Severity: {a.severity}</p>)
            ) : (
              <p className="text-gray-600">No known allergies</p>
            )}
          </div>
        </div>

        <div className="card wide-card">
          <div className="card-header">
            <h2 onClick={() => setShowConditionModal(true)}>Current Conditions</h2>
          </div>
          <div className="condition-list">
            {conditions.length ? (
              conditions.map((c, i) => (
                <p key={i}><strong>{c.conditionName}</strong><br />Diagnosed on: {new Date(c.createdAt).toLocaleDateString()}</p>
              ))
            ) : (
              <p className="text-gray-600">No existing conditions</p>
            )}
          </div>
        </div>

        <div className="card wide-card">
          <div className="card-header">
            <h2 onClick={() => setShowInsuranceModal(true)}>Insurance Information</h2>
            <Plus className="add-icon" onClick={() => setShowAddInsuranceModal(!showAddInsuranceModal)}/>
          </div>
          <div className="insurance-info">
            {latestInsurance ? (
              <>
                <p>{latestInsurance.providerName}</p>
                <p>Policy Number: {latestInsurance.policyNumber}</p>
                <p>Updated: {new Date(latestInsurance.updatedAt).toLocaleDateString()}</p>
              </>
            ) : (
              <p className="text-gray-600">No insurance details available</p>
            )}
          </div>
        </div>

        <div className="card wide-card">
          <div className="card-header">
            <h2 onClick={() => setShowSurgeryModal(true)}>Surgical History</h2>
          </div>
          <div className="surgery-list">
            {surgeries.length ? (
              surgeries.map((c, i) => (
                <p key={i}><strong>{c.surgeryName}</strong><br />Date: {new Date(c.surgeryDate).toLocaleDateString()}<br />Hospital: {c.surgeryHospital}</p>
              ))
            ) : (
              <p className="text-gray-600">No Surgeries</p>
            )}
          </div>
        </div>

        <div className="card wide-card">
          <h2 onClick={() => setShowPrescriptionModal(true)}>Current Prescriptions</h2>
          {latestPrescriptions.length ? (
            latestPrescriptions.map((p, i) => (
              <p key={i}><strong>{p.medication}</strong><br />Dosage: {p.dosage}<br />Instructions: {p.instructions}<br />Prescribed on: {new Date(p.prescribedDate).toLocaleDateString()}</p>
            ))
          ) : (
            <p className="text-gray-600">No active prescriptions</p>
          )}
        </div>
      </div>

      {showAllergyModal && <AllergyModal allergies={allergies} onClose={() => setShowAllergyModal(false)} />}
      {showConditionModal && <ConditionModal conditions={conditions} onClose={() => setShowConditionModal(false)} />}
      {showInsuranceModal && (<InsuranceModal insuranceList={latestInsurance ? [latestInsurance] : []} onClose={() => setShowInsuranceModal(false)}/>)}

      {showPrescriptionModal && <PrescriptionModal prescriptions={latestPrescriptions} onClose={() => setShowPrescriptionModal(false)} />}
      {showSurgeryModal && <SurgeryModal surgeries={surgeries} onClose={() => setShowSurgeryModal(false)} />}
      {showAppointmentsModal && (
        <AppointmentsModal
          appointments={[...upcomingAppointments, ...pastAppointments]}
          title="All Appointments"
          onClose={() => setShowAppointmentsModal(false)}
        />
      )}
      {showAddInsuranceModal && (
        <AddInsuranceModal
          onClose={() => setShowAddInsuranceModal(false)}
          onAdd={handleAddInsurance}
        />
      )}
    </div>
  );
};

export default PatientDashboard;
