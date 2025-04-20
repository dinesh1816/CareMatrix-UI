import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";
import AddAllergyModal from "./AddAllergyModal"; 
import AddConditionModal from "./AddConditionModal";
import AddPrescriptionModal from "./AddPrescriptionModal";
import AddSurgeryModal from "./AddSurgeryModal";
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

const doctor = {
  name: "Dr. John Smith",
  emailAddress: "doctor@example.com",
  id: "CMX-DOC-1001",
  age: 40,
  gender: "Male",
  dateOfBirth: "1983-01-01",
  mobileNumber: "+1 (555) 987-6543",
  street: "spid",
  city: "corpus christi",
  state: "texas",
  country: "USA",
  zipcode: "78412",
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
  const [searchName, setSearchName] = useState("");
  const [searchDob, setSearchDob] = useState("");
  const [patientId, setPatientId] = useState("");
  const navigate = useNavigate();

  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showSurgeryModal, setShowSurgeryModal] = useState(false);
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);

  const [showAddAllergyModal, setShowAddAllergyModal] = useState(false); 
  const [showAddConditionModal, setShowAddConditionModal] = useState(false);
  const [showAddPrescriptionModal, setShowAddPrescriptionModal] = useState(false);
  const [showAddSurgeryModal, setShowAddSurgeryModal] = useState(false);

  const [searchResult, setSearchResult] = useState<{
    name: string;
    id: number;
    age: number;
    gender: string;
    bloodGroup: string;
    conditions: { name: string; date: string; status: string }[];
    prescriptions: { medication: string; dosage: string; frequency: string; instructions: string; prescribedDate: string }[];
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
          { medication: "Amoxicillin", dosage: "500mg", frequency: "Twice daily", instructions: "with water", prescribedDate: "2023-12-01" },
          { medication: "Loratadine", dosage: "10mg", frequency: "Once daily", instructions: "empty stomach", prescribedDate: "2023-11-15" },
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

  const handleAddAllergy = async (allergy: { allergyName: string; severity: string; diagnosedDate: string; notes?: string }) => {
    try {
      const token = localStorage.getItem("jwtToken");
  
      const res = await fetch(`${baseURL}/patient/allergies/${patientId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allergy),
      });
  
      if (!res.ok) throw new Error("Failed to add allergy");
  
      const newAllergy = await res.json();
      setAllergies((prev) => [...prev, newAllergy]);
    } catch (err) {
      console.error("Error adding allergy:", err);
    }
  };

  const handleAddCondition = async (condition: { conditionName: string; status: string; diagnosedDate: string; notes?: string }) => {
    try {
      const token = localStorage.getItem("jwtToken");
  
      const res = await fetch(`${baseURL}/patient/conditions/${patientId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(condition),
      });
  
      if (!res.ok) throw new Error("Failed to add allergy");
  
      const newAllergy = await res.json();
      setConditions((prev) => [...prev, newAllergy]);
    } catch (err) {
      console.error("Error adding allergy:", err);
    }
  };

  const handleAddPrescription = async (prescription: {
    medication: string;
    dosage: string;
    frequency: string;
    instructions: string;
    prescribedDate: string;
    notes?: string;
  }) => {
    try {
      const token = localStorage.getItem("jwtToken");
  
      const res = await fetch(`${baseURL}/patient/prescriptions/${patientId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prescription),
      });
  
      if (!res.ok) throw new Error("Failed to add prescription");
  
      const newPrescription = await res.json();
      setLatestPrescriptions((prev) => [...prev, newPrescription]);
    } catch (err) {
      console.error("Error adding prescription:", err);
    }
  };
  
  const handleAddSurgery = async (prescription: {
    surgeryName: string;
    surgeryDate: string;
    surgeryHospital: string;
    notes?: string;
  }) => {
    try {
      const token = localStorage.getItem("jwtToken");
  
      const res = await fetch(`${baseURL}/patient/surgeries/${patientId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prescription),
      });
  
      if (!res.ok) throw new Error("Failed to add prescription");
  
      const newSurgery = await res.json();
      setSurgeries((prev) => [...prev, newSurgery]);
    } catch (err) {
      console.error("Error adding prescription:", err);
    }
  };
  
  

  return (
    <div className="dashboard-container">
      <div className="doctor-top-bar">
        <h2>{doctor.name}</h2>
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
          <input type="text" placeholder="Enter patient name" onChange={(e) => setSearchName(e.target.value)} />
          <input type="text" placeholder="mm/dd/yyyy" onChange={(e) => setSearchDob(e.target.value)}/>
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

            <div className="card">
              <div className="card-header">
                <h4 onClick={() => setShowAllergyModal(true)}>Allergies</h4>
                <Plus className="add-icon" onClick={(() => setShowAddAllergyModal(!showAddAllergyModal))}/>
              </div>
              {searchResult.allergies.map((allergy, index) => (
                <p key={index} className="allergy-item">
                  {allergy}
                </p>
              ))}
            </div>

            <div className="card">
              <div className="card-header">
                <h4 onClick={() => setShowConditionModal(true)}>Current Conditions</h4>
                <Plus className="add-icon" onClick={() => setShowAddConditionModal(true)}/>

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

            <div className="card">
              <div className="card-header">
                <h4 onClick={() => setShowPrescriptionModal(true)}>Current Prescriptions</h4>
                <Plus className="add-icon"  onClick={() => setShowAddConditionModal(true)} />
              </div>
              {searchResult.prescriptions.map((pres, index) => (
                <p key={index} className="prescription-item">
                  <strong>{pres.medication}</strong>
                  <br />
                  Dosage: {pres.dosage}
                  <br />
                  Frequency: {pres.frequency}
                  <br />
                  Instructions: {pres.instructions}
                  <br />
                  Prescribed: {pres.prescribedDate}
                </p>
              ))}
            </div>

            <div className="card">
            <div className="card-header">
              <h4 onClick={() => setShowInsuranceModal(true)}>Insurance Information</h4>
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

            <div className="card">
              <div className="card-header">
                <h4 onClick={() => setShowSurgeryModal(true)}>Surgical History</h4>
                <Plus className="add-icon" onClick={() => setShowAddSurgeryModal(true)}/>
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

      {showAllergyModal && <AllergyModal userId={patientId} onClose={() => setShowAllergyModal(false)} />}
      {showConditionModal && <ConditionModal userId={patientId} onClose={() => setShowConditionModal(false)} />}
      {showInsuranceModal && (<InsuranceModal userId={patientId} onClose={() => setShowInsuranceModal(false)}/>)}
      {showPrescriptionModal && <PrescriptionModal userId={patientId} onClose={() => setShowPrescriptionModal(false)} />}
      {showSurgeryModal && <SurgeryModal userId={patientId} onClose={() => setShowSurgeryModal(false)} />}
      {showAppointmentsModal && (
        <AppointmentsModal
          title="All Appointments"
          onClose={() => setShowAppointmentsModal(false)}
        />
      )}

      {showAddAllergyModal && (
        <AddAllergyModal
          onClose={() => setShowAddAllergyModal(false)}
          onAdd={handleAddAllergy}
        />
      )}

      {showAddConditionModal && (
        <AddConditionModal
          onClose={() => setShowAddConditionModal(false)}
          onAdd={handleAddCondition}
        />
      )}

      {showAddPrescriptionModal && (
        <AddPrescriptionModal
          onClose={() => setShowAddPrescriptionModal(false)}
          onAdd={handleAddPrescription}
        />
      )}

      {showAddSurgeryModal && (
        <AddSurgeryModal
          onClose={() => setShowAddSurgeryModal(false)}
          onAdd={handleAddSurgery}
        />
      )}

    </div>
  );
};

export default DoctorDashboard;
