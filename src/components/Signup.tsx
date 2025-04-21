import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import "./Signup.css";

const Signup = () => {
  const signupURL = process.env.REACT_APP_SIGNUP_API_URL || "";

  const [signupRole, setSignupRole] = useState("PATIENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");

  const navigate = useNavigate();

  function formatDateToYYYYMMDD(dateInput: string | Date): string {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return ''; // Invalid date
  
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Month is 0-indexed
    const day = `${date.getDate()}`.padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = {
        username: name,
        name: name,
        emailAddress: email,
        password: password,
        role: signupRole,
        age: parseInt(age),
        gender: gender,
        dateOfBirth: formatDateToYYYYMMDD(date),
        mobileNumber: contact,
        bloodGroup: bloodGroup,
        street: street,
        city: city,
        state: state,
        country: country,
        zipcode: zipcode,
        email: email,
        phone: contact,
        experience: "",
        licenseNumber: 0,
        department: "",
        education: ""
      };
      const response = await fetch(signupURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.text();

      if (data === "User registered successfully.") {
        navigate("/");
      } else {
        alert("Signup failed: Invalid entry");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <div className="flex justify-center">
          <Stethoscope className="stethscope" />
        </div>
        <h2>Create a new account</h2>
      </div>
      <form onSubmit={handleSignup}>
        <div className="grid-container">
          <div className="input-group">
            <label>Full Name *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Email *</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password *</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Role *</label>
            <select value={signupRole} onChange={(e) => setSignupRole(e.target.value)}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <div className="input-group">
            <label>Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="input-group">
            <label>Date of Birth</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Contact</label>
            <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Street</label>
            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
          </div>
          <div className="input-group">
            <label>City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="input-group">
            <label>State</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Country</label>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Zipcode</label>
            <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Blood Group</label>
            <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
              <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
              <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
            </select>
          </div>
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <div className="signin-text">
        <p><span className="link" onClick={() => navigate("/")}>Already have an account? Sign in</span></p>
      </div>
    </div>
  );
};

export default Signup;
