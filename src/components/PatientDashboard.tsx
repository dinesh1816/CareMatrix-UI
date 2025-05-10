import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientDashboard.css";
import AppointmentsSection from "./AppointmentsSection";
import { ProfileModal } from "./ProfileModal";
import AllergyModal from "./AllergyModal";
import ConditionModal from "./ConditionModal";
import InsuranceModal from "./InsuranceModal";
import PrescriptionModal from "./PrescriptionModal";
import SurgeryModal from "./SurgeryModal";
import AppointmentsModal from "./AppointmentsModal";
import AddInsuranceModal from "./AddInsuranceModal";
import { UserCircle2, LogOut, Plus } from "lucide-react";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const patientId = localStorage.getItem("userId");
console.log("patient id is", patientId, "localstorageid is", localStorage.getItem("userId"));

type Appointment = {
  date: string;
  time: string;
  reason: string;
  type: string;
  link: string;
};

type Allergy = {
  allergyName: string;
  severity: string;
};

type Condition = {
  conditionName: string;
  diagnosedDate: string;
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
};

type Surgery = {
  surgeryName: string;
  surgeryDate: string;
  hospital: string;
};

type PatientProfile = {
  name: string;
  emailAddress: string;
  id: string | number;
  age: number;
  gender: string;
  dateOfBirth: string;
  mobileNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  bloodGroup: string;
};

const PatientDashboard = () => {
  console.log("inside patient dashboard");
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

  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showSurgeryModal, setShowSurgeryModal] = useState(false);
  const [showUpcomingAppointmentsModal, setShowUpcomingAppointmentsModal] = useState(false);
  const [showPastAppointmentsModal, setShowPastAppointmentsModal] = useState(false);
  const [showAddInsuranceModal, setShowAddInsuranceModal] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {

    localStorage.removeItem("jwtToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    navigate("/");
  };

  const fetchPatientProfile = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const url = `${baseURL}/patients/get/${patientId}`;
      console.log("patientId", patientId, " localstorage id", localStorage.getItem("userId"));
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (!res.ok) throw new Error("Failed to fetch profile");
      
      const user = await res.json();
      setPatientProfile(user);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const fetchPatientrPastAppointments = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/appointments/patient/${patientId}?appointmentTimeType=past&page=0&size=2`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch appointments");

      const data = await res.json();
      setPastAppointments(data.content || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const fetchPatientUpcomingAppointments = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/appointments/patient/${patientId}?appointmentTimeType=upcoming&page=0&size=2`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch appointments");

      const data = await res.json();
      setUpcomingAppointments(data.content || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const fetchPatientAllergies = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patients/${patientId}/allergies?page=0&size=3`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch allergies");

      const data = await res.json();
      setAllergies(data.content.slice(0, 3) || []);
    } catch (err) {
      console.error("Error fetching allergies:", err);
    }
  };

  const fetchPatientInsurance = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patients/${patientId}/insurance?page=0&size=3`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch insurance");
      const data = await res.json();
      setLatestInsurance(data.content?.[0] || null);
    } catch (err) {
      console.error("Error fetching insurance:", err);
    }
  };

  const fetchPatientCondition = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patients/${patientId}/conditions?page=0&size=3`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch conditions");

      const data = await res.json();
      setConditions(data.content.slice(0,3) || []);
    } catch (err) {
      console.error("Error fetching conditions:", err);
    }
  };

  const fetchPatientPrescription = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patients/${patientId}/prescriptions?page=0&size=3`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch prescriptions");

      const data = await res.json();
      setLatestPrescriptions(data.content.slice(0,3) || []);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
    }
  };

  const fetchPatientSurgeries = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patients/${patientId}/surgical-history?page=0&size=3`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch surgeries");

      const data = await res.json();
      setSurgeries(data.content.slice(0,3) || []);
    } catch (err) {
      console.error("Error fetching surgeries:", err);
    }
  }

  const fetchDashboardData = async () => {
    fetchPatientProfile();
    fetchPatientrPastAppointments();
    fetchPatientUpcomingAppointments();
    fetchPatientAllergies();
    fetchPatientInsurance();
    fetchPatientCondition();
    fetchPatientPrescription();
    fetchPatientSurgeries();
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const handleAddInsurance = async (insurance: { providerName: string; policyNumber: string; expireDate: string; coverage: string; notes?: string }) => {
    try {
      const token = localStorage.getItem("jwtToken");
  
      const res = await fetch(`${baseURL}/patients/${patientId}/insurance`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(insurance),
      });
  
      if (!res.ok) throw new Error("Failed to add allergy");
  
      const newInsurance = await res.json();
      setAddInsurance((prev) => [...prev, newInsurance]);
      fetchPatientInsurance();
    } catch (err) {
      console.error("Error adding allergy:", err);
    }
  };

  const refreshProfile = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const userId = localStorage.getItem("userId");
      
      if (!userId) return;

      const response = await fetch(`${baseURL}/patients/get/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to fetch profile");
      
      const data = await response.json();
      setPatientProfile(data);
    } catch (error) {
      console.error("Error refreshing profile:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h1>Welcome, {patientProfile?.name || "Patient"}</h1>
        <div className="icons">
          <UserCircle2 className="icon" onClick={() => setShowProfile(!showProfile)} />
          {showProfile && patientProfile && (
            <ProfileModal 
              user={patientProfile} 
              onClose={() => setShowProfile(false)} 
              onProfileUpdate={refreshProfile}
            />
          )}
          <LogOut className="icon" onClick={handleLogout} />
        </div>
      </div>

      <AppointmentsSection 
        upcomingAppointments={upcomingAppointments} 
        pastAppointments={pastAppointments}
        onUpcomingClick={() => setShowUpcomingAppointmentsModal(true)}
        onPastClick={() => setShowPastAppointmentsModal(true)}
      />

      <div className="patient-grid-layout">
        <div className="card wide-card">
          <div className="card-header">
            <h2 onClick={() => setShowAllergyModal(true)}>Allergies</h2>
          </div>
          <div className="allergy-item">
            {allergies.length ? (
              allergies.map((a, i) => (
              <p key={i} className="allergy-list">
                {a.allergyName}
              </p>
            ))
            ) : (
              <p className="text-gray-600">No known allergies</p>
            )}
          </div>
        </div>

        <div className="card wide-card">
          <div className="card-header">
            <h2 onClick={() => setShowConditionModal(true)}>Current Conditions</h2>
          </div>
          <div className="condition-item">
            {conditions.length ? (
              conditions.map((c, i) => (
                <p key={i} className="condition-list"><strong>{c.conditionName}</strong><br />Diagnosed on: {new Date(c.diagnosedDate).toLocaleDateString()}</p>
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
          <div className="surgery-item">
            {surgeries.length ? (
              surgeries.map((c, i) => (
                <p key={i} className="surgery-list"><strong>{c.surgeryName}</strong><br />Date: {new Date(c.surgeryDate).toLocaleDateString()}<br />Hospital: {c.hospital}</p>
              ))
            ) : (
              <p className="text-gray-600">No Surgeries</p>
            )}
          </div>
        </div>

        <div className="card wide-card">
          <div className="card-header">
            <h2 onClick={() => setShowPrescriptionModal(true)}>Current Prescriptions</h2>
          </div>
          <div>
            {latestPrescriptions.length ? (
              latestPrescriptions.map((p, i) => (
                <p key={i} className="prescription-list"><strong>{p.medication}</strong><br />Dosage: {p.dosage}<br />Instructions: {p.instructions}<br />Prescribed on: {new Date(p.prescribedDate).toLocaleDateString()}</p>
              ))
            ) : (
              <p className="text-gray-600">No active prescriptions</p>
            )}
          </div>
        </div>
      </div>

      {showAllergyModal && <AllergyModal userId={patientId} onClose={() => setShowAllergyModal(false)} />}
      {showConditionModal && <ConditionModal userId={patientId} onClose={() => setShowConditionModal(false)} />}
      {showInsuranceModal && (<InsuranceModal userId={patientId} onClose={() => setShowInsuranceModal(false)}/>)}
      {showPrescriptionModal && <PrescriptionModal userId={patientId} onClose={() => setShowPrescriptionModal(false)} />}
      {showSurgeryModal && <SurgeryModal userId={patientId} onClose={() => setShowSurgeryModal(false)} />}

      {showUpcomingAppointmentsModal && (
        <AppointmentsModal
          title="Upcoming Appointments"
          onClose={() => setShowUpcomingAppointmentsModal(false)}
          doctorId={null}
          patientId={patientId}
          appointmentType="upcoming"
        />
      )}

      {showPastAppointmentsModal && (
        <AppointmentsModal
          title="Past Appointments"
          onClose={() => setShowPastAppointmentsModal(false)}
          doctorId={null}
          patientId={patientId}
          appointmentType="past"
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
