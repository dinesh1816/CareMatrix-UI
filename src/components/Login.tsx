import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from 'lucide-react';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await // Example with fetch
      fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // ✅ Required to match allowCredentials=true
        body: JSON.stringify({ email, password })
      });
      

      // if (!response.ok) {
      //   // throw new Error("Invalid credentials");
      // }

      const data = await response.json();
      const { token, role, id } = data;

      // Save token and user info to localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);

      // Navigate based on role
      if (role === "DOCTOR") {
        navigate("/doctor-dashboard");
      } else if (role === "PATIENT") {
        navigate("/patient-dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin")
      }else {
        alert("Unknown user role");
      }

    } catch (error) {
      // alert("Login failed: ");
      console.log("inside login error");
      if(email === "admin@example.com" && password === "admin123") {
        navigate("/admin-dashboard")
      } else if (email === "patient@example.com" && password === "patient123") {
        navigate("/patient-dashboard")
      } else if (email === "doctor@example.com" && password === "doctor123") {
        navigate("/doctor-dashboard")
      }
    }
  };

  return (
    <div>
    <div className="login-container">
      <div className="login-header">
        <div className="flex justify-center">
          <Stethoscope className="stethscope"/>
        </div>
        <h2>Sign in to your account</h2>
      </div>
    </div>
    <div className="login-form">
      <form  onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Sign In</button>
      </form>
      <div className="signup-text">
        <p><span className="signup-link"
          onClick={() => navigate("/signup")}
          style={{ color: "blue", cursor: "pointer" }} >Don't have an account? Sign up</span></p>
      </div>
    </div>  
      </div>
  );
};

export default Login;