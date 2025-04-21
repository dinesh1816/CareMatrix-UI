import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from 'lucide-react';
import "./Login.css";

const Login = () => {
  const [enterUsername, setEnterUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginRole = "doctor";
    try {
      const response = await // Example with fetch
      fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // ✅ Required to match allowCredentials=true
        body: JSON.stringify({ username: enterUsername, password })
      });

      const data = await response.json();
      const { token, role, id, username } = data;
      const localstorageuserrole = role.toLowerCase();

      // Save token and user info to localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("role", localstorageuserrole);
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", username);
      console.log("loggedin successfully");
      
      if(localstorageuserrole === "patient") {
        navigate("/patient-dashboard")
      } else if (localstorageuserrole === "doctor") {
        navigate("doctor-dashboard")
      }
    } catch (error) {
      alert("Login failed: ");
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
          <label>Username</label>
          <input 
            type="username" 
            value={enterUsername} 
            onChange={(e) => setEnterUsername(e.target.value)}
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