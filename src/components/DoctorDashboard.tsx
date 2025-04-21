import React, { useEffect, useState } from "react";
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
const doctorId = localStorage.getItem("userId");

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

const DoctorDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showAppointmentScheduler, setShowAppointmentScheduler] = useState(false);
  const [showTelemedicineModal, setShowTelemedicineModal] = useState(false);
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

  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientBloodGroup, setPatientBloodGroup] = useState("");
  const [patientMobileNumber, setPatientMobileNumber] = useState("");
  const [patientEmailAddress, setPatientEmailAddress] = useState("");
  const [patientStreet, setPatientStreet] = useState("");
  const [patientCity, setPatientCity] = useState("");
  const [patientState, setPatientState] = useState("");
  const [patientCountry, setPatientCountry] = useState("");
  const [patientZipCode, setPatientZipCode] = useState("");
  
  const [doctorName, setDoctorName] = useState("");
  const [doctorEmailAddress, setDoctorEmailAddress] = useState("");
  const [doctorAge, setDoctorAge] = useState("");
  const [doctorGender, setDoctorGender] = useState("");
  const [doctorDOB, setDoctorDOB] = useState("");
  const [doctorMobileNumber, setDoctorMobileNumber] = useState("");
  const [doctorStreet, setDoctorStreet] = useState("");
  const [doctorCity, setDoctorCity] = useState("");
  const [doctorState, setDoctorState] = useState("");
  const [doctorCountry, setDoctorCountry] = useState("");
  const [doctorZipCode, setDoctorZipCode] = useState("");
  const [doctorBloodGroup, setDoctorBloodGroup] = useState("");
  const [doctorExperience, setDoctorExperience] = useState("");
  const [doctorLicense, setDoctorLicense] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [doctorEducation, setDoctorEducation] = useState("");

  const doctor = {
    name: doctorName,
    emailAddress: doctorEmailAddress,
    id: doctorId,
    age: doctorAge,
    gender: doctorGender,
    dateOfBirth: doctorDOB,
    mobileNumber: doctorMobileNumber,
    street: doctorStreet,
    city: doctorCity,
    state: doctorState,
    country: doctorCountry,
    zipcode: doctorZipCode,
    bloodGroup: doctorBloodGroup,
  };

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



  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/api/doctors/patients/${searchId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error("Failed to fetch patient details");
  
      const data = await res.json(); // ✅ Parse response
  
      // ✅ Now assign values from `data`
      setPatientName(data.name);
      setPatientAge(data.age);
      setPatientGender(data.gender);
      setPatientBloodGroup(data.bloodGroup);
      setPatientMobileNumber(data.mobileNumber);
      setPatientEmailAddress(data.emailAddress);
      setPatientStreet(data.street);
      setPatientCity(data.city);
      setPatientState(data.state);
      setPatientCountry(data.country);
      setPatientZipCode(data.zipcode);
      setAllergies(data.allergies.slice(0,3));
      setConditions(data.currentConditions.slice(0,3));
      setLatestPrescriptions(data.currentPrescriptions.slice(0,3));
      setSurgeries(data.surgeries.slice(0,3));
      setLatestInsurance(data.insuranceInformations?.[0] || null); // If array
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };
  

  const handleAddAllergy = async (allergy: { allergyName: string; severity: string; notes?: string }) => {
    try {
      const token = localStorage.getItem("jwtToken");
  
      const res = await fetch(`${baseURL}/patient/${patientId}/allergies`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allergy),
      });
  
      if (!res.ok) throw new Error("Failed to add allergy");
  
    } catch (err) {
      console.error("Error adding allergy:", err);
    }
  };

  const handleAddCondition = async (condition: { conditionName: string; status: string; diagnosedDate: string; notes?: string }) => {
    try {
      const token = localStorage.getItem("jwtToken");
  
      const res = await fetch(`${baseURL}/patient/${patientId}/conditions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(condition),
      });
  
      if (!res.ok) throw new Error("Failed to add allergy");
    } catch (err) {
      console.error("Error adding allergy:", err);
    }
  };

  const handleAddPrescription = async (prescription: {
    medication: string;
    dosage: string;
    frequency: string;
    prescribedDate: string;
    notes?: string;
  }) => {
    try {
      const token = localStorage.getItem("jwtToken");
  
      const res = await fetch(`${baseURL}/patient/${patientId}/prescriptions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prescription),
      });
  
      if (!res.ok) throw new Error("Failed to add prescription");
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
        body: JSON.stringify({surgeryName: prescription.surgeryName, surgeryDate: prescription.surgeryDate, hospital: prescription.surgeryHospital }),
      });
  
      if (!res.ok) throw new Error("Failed to add prescription");
    } catch (err) {
      console.error("Error adding prescription:", err);
    }
  };
  
  const handleLogout = async () => {

    localStorage.removeItem("jwtToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    navigate("/");
  };

  const fetchDoctorDetails = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patients/${doctorId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");


      const user = await res.json();
      setDoctorName(user.name);
      setDoctorEmailAddress(user.email);
      setDoctorAge(user.age);
      setDoctorMobileNumber(user.mobileNumber);
      setDoctorDOB(user.dateOfBirth);
      setDoctorGender(user.gender);
      setDoctorState(user.street);
      setDoctorCity(user.city);
      setDoctorState(user.state);
      setDoctorCountry(user.country);
      setDoctorZipCode(user.zipcode);
      setDoctorExperience(user.experience);
      setDoctorLicense(user.LicenseNumber);
      setDoctorDepartment(user.department);
      setDoctorEducation(user.education);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  }

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="doctor-top-bar">
        <h2>{doctorName}</h2>
        <button onClick={() => setShowTelemedicineModal(true)} className="telemedicine-btn">
          <Video />Telemedicine Consultation
        </button>
        {showTelemedicineModal && <TelemedicineModal onClose={() => setShowTelemedicineModal(false)} role={localStorage.getItem("role")}/>}
        <button onClick={() => setShowAppointmentScheduler(true)} className="appointment-btn">
          <Calendar />Schedule Appointment
        </button>
        {showAppointmentScheduler && <AppointmentScheduler onClose={() => setShowAppointmentScheduler(false)}/>}
        <div className="icons">
          <UserCircle2 className="icon" onClick={() => setShowProfile(!showProfile)} />
          {showProfile && (
            <ProfileModal
              user={doctor}
              onClose={() => setShowProfile(false)}
            />
          )}
          <LogOut className="icon" onClick={() => handleLogout()} />
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
          doctorId = {localStorage.getItem("userId")}
          patientId = {null}
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


