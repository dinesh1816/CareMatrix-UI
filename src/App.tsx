import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import AdminDashboard from "./components/AdminDashboard";
import { jwtDecode } from 'jwt-decode'; // For decoding JWT
import "./App.css";

const checkTokenValidity = (navigate: any) => {
  const token = localStorage.getItem('jwtToken');

  // Check if token exists
  if (token) {
    try {
      // Decode the token to get the expiration time
      const decoded = jwtDecode(token);

      // Get current time and expiration time
      const currentTime = Date.now() / 1000; // Convert to seconds
      const expirationTime = decoded.exp;  // Expiration time in seconds

      // Check if the token is expired
      if (expirationTime && currentTime > expirationTime) {
        console.log("Token expired, logging out...");
        
        // Remove token from localStorage
        localStorage.removeItem('jwtToken');
        
        // Redirect to login page
        navigate('/'); // Use React Router navigate to redirect
      }
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }
};

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check token validity every 1 hour (3600000ms)
    const interval = setInterval(() => {
      checkTokenValidity(navigate);
    }, 300000); // 1 hour = 3600000ms

    // Cleanup interval when the component unmounts
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
