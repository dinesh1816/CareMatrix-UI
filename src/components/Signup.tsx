import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import "./Signup.css";

const Signup = () => {
  const [signupRole, setSignupRole] = useState("PATIENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("A+");

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = {
        username: name,
        email: email,
        password: password,
        role: signupRole,
        age: parseInt(age),
        gender: gender,
        dateOfBirth: date,
        contact: contact,
        address: address,
        bloodGroup: bloodGroup
      };
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        navigate("/");
      } else {
        const err = await response.json();
        console.error("Signup failed:", err);
        alert("Signup failed: " + err.message);
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
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
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
          <div className="input-group full-width">
            <label>Address</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="input-group full-width">
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
