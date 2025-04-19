import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from 'lucide-react';
import "./Signup.css";

const Signup = () => {
  const [signupRole, setSignupRole] = useState("PATIENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent form reload

    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
          role: signupRole
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        navigate("/"); // redirect to login
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
          {/* Optional fields (not sent to signup API but kept for form completeness) */}
          <div className="input-group"><label>Age</label><input type="number" /></div>
          <div className="input-group"><label>Gender</label><select><option>Male</option><option>Female</option></select></div>
          <div className="input-group"><label>Date of Birth</label><input type="date" /></div>
          <div className="input-group"><label>Contact</label><input type="text" /></div>
          <div className="input-group full-width"><label>Address</label><input type="text" /></div>
          <div className="input-group full-width">
            <label>Blood Group</label>
            <select>
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
