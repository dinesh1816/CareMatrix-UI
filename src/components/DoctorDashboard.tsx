import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";
// import { users } from "../data/user";
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
import { Search, UserCircle2, LogOut, Plus, Video, Calendar } from "lucide-react";

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
};

type Prescription = {
  medication: string;
  dosage: string;
  instructions: string;
  createdAt: string;
};

type Insurance = {
  providerName: string;
  policyNumber: string;
  updatedAt: string;
};

type Surgery = {
  surgeryName: string;
  surgeryDate: string;
  surgeryHospital: string;
};

const doctor = {
  username: "Dr. John Smith",
  email: "doctor@example.com",
  uniqueId: "CMX-DOC-1001",
  age: 40,
  gender: "Male",
  dateOfBirth: "1983-01-01",
  contact: "+1 (555) 987-6543",
  address: "456 Clinic Ave, Wellness City, WC 54321",
  bloodGroup: "A+",
};

const DoctorDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showAppointmentScheduler, setShowAppointmentScheduler] = useState(false);
  const [showTelemedicineModal, setShowTelemedicineModal] = useState(false);
  const [upcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments] = useState<Appointment[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [latestInsurance, setLatestInsurance] = useState<Insurance | null>(null);
  const [latestPrescriptions, setLatestPrescriptions] = useState<Prescription[]>([]);
 
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showSurgeryModal, setShowSurgeryModal] = useState(false);
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);

  const [searchResult, setSearchResult] = useState<{
    name: string;
    id: number;
    age: number;
    gender: string;
    bloodGroup: string;
    conditions: { name: string; date: string; status: string }[];
    prescriptions: { name: string; dosage: string; frequency: string; date: string }[];
    allergies: string[];
    insurance: { provider: string; policyNumber: string; expiryDate: string; coverage: string };
    surgeries: { name: string; date: string; hospital: string }[];
  } | null>(null);

  const handleSearch = () => {
    if (searchId === "2") {
      setSearchResult({
        name: "Jane Doe",
        id: 2,
        age: 28,
        gender: "female",
        bloodGroup: "O+",
        conditions: [
          { name: "Asthma", date: "2015-05-10", status: "Controlled" },
          { name: "Seasonal Allergies", date: "2018-03-22", status: "Ongoing" },
        ],
        prescriptions: [
          { name: "Amoxicillin", dosage: "500mg", frequency: "Twice daily", date: "2023-12-01" },
          { name: "Loratadine", dosage: "10mg", frequency: "Once daily", date: "2023-11-15" },
        ],
        allergies: ["Penicillin", "Peanuts", "Latex"],
        insurance: {
          provider: "HealthGuard Insurance",
          policyNumber: "HG123456789",
          expiryDate: "2024-12-31",
          coverage: "Comprehensive",
        },
        surgeries: [
          { name: "Appendectomy", date: "2020-03-15", hospital: "City General Hospital" },
          { name: "Tonsillectomy", date: "2018-07-22", hospital: "Medical Center East" },
        ],
      });
    } else {
      setSearchResult(null);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="doctor-top-bar">
        <h2>{doctor.username}</h2>
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
          {showProfile && (
            <ProfileModal
              user={doctor}
              onClose={() => setShowProfile(false)}
            />
          )}
          <LogOut className="icon" onClick={() => navigate("/")} />
        </div>
      </div>
      
      <div onClick={() => setShowAppointmentsModal(true)}>
      <AppointmentsSection
        upcomingAppointments={upcomingAppointments}
        pastAppointments={pastAppointments}
      />
      </div>

      <div className="search-container">
        <h3>Patient Search</h3>
        <div className="search-box">
          <input type="text" placeholder="Enter patient name" />
          <input type="text" placeholder="mm/dd/yyyy" />
          <input
            type="text"
            placeholder="Enter patient ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            <Search className="search-icon" />Search Patient
          </button>
        </div>
      </div>

      {searchResult && (
        <div className="patient-records">
          <div className="patient-record-header">
            <h3>Patient Records</h3>
            <div className="back-to-search">
              <button onClick={() => setSearchResult(null)} className="link-button">
                Back to Search Results
              </button>
            </div>
          </div>

          <div className="grid-layout">
            <div className="card">
              <h4>Patient Information</h4>
              <p>Name: {searchResult.name}</p>
              <p>ID: {searchResult.id}</p>
              <p>Age: {searchResult.age}</p>
              <p>Gender: {searchResult.gender}</p>
              <p>Blood Group: {searchResult.bloodGroup}</p>
            </div>

            <div className="card" onClick={() => setShowAllergyModal(true)}>
              <div className="card-header">
                <h4>Allergies</h4>
                <Plus className="add-icon" />
              </div>
              {searchResult.allergies.map((allergy, index) => (
                <p key={index} className="allergy-item">
                  {allergy}
                </p>
              ))}
            </div>

            <div className="card" onClick={() => setShowConditionModal(true)}>
              <div className="card-header">
                <h4>Current Conditions</h4>
                <Plus className="add-icon" />
              </div>
              {searchResult.conditions.map((cond, index) => (
                <p key={index} className="condition-item">
                  <strong>{cond.name}</strong>
                  <br />
                  Diagnosed: {cond.date}
                  <br />
                  Status: {cond.status}
                </p>
              ))}
            </div>

            <div className="card" onClick={() => setShowPrescriptionModal(true)}>
              <div className="card-header">
                <h4>Current Prescriptions</h4>
                <Plus className="add-icon" />
              </div>
              {searchResult.prescriptions.map((pres, index) => (
                <p key={index} className="prescription-item">
                  <strong>{pres.name}</strong>
                  <br />
                  Dosage: {pres.dosage}
                  <br />
                  Frequency: {pres.frequency}
                  <br />
                  Prescribed: {pres.date}
                </p>
              ))}
            </div>

            <div className="card" onClick={() => setShowInsuranceModal(true)}>
            <div className="card-header">
              <h4>Insurance Information</h4>
            </div>
              <p className="insurance-info">
                <strong>{searchResult.insurance.provider}</strong>
                <br />
                Policy Number: {searchResult.insurance.policyNumber}
                <br />
                Expiry Date: {searchResult.insurance.expiryDate}
                <br />
                Coverage: {searchResult.insurance.coverage}
              </p>
            </div>

            <div className="card" onClick={() => setShowSurgeryModal(true)}>
              <div className="card-header">
                <h4>Surgical History</h4>
                <Plus className="add-icon" />
              </div>
              {searchResult.surgeries.map((surgery, index) => (
                <p key={index} className="surgery-item">
                  <strong>{surgery.name}</strong>
                  <br />
                  Date: {surgery.date}
                  <br />
                  Hospital: {surgery.hospital}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default DoctorDashboard;
