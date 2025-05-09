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
  const [passwordTouched, setPasswordTouched] = useState(false);

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

  const formatDateToYYYYMMDD = (dateInput: string | Date): string => {
    if (typeof dateInput === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
      // Already in correct format from <input type="date" />
      console.log("the return value is", dateInput);
      return dateInput;
    }
    const date = new Date(dateInput);
    // if (isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    console.log("the return value is", `${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  };

  const passwordChecks = {
    minLength: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordTouched(true);
  };

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
      console.log("the formatted DOB is", formatDateToYYYYMMDD(date));
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
            <input
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => setPasswordTouched(true)}
            />
            {passwordTouched && (
              <div className="password-rules">
                <p>Password must contain:</p>
                <ul>
                  <li className={passwordChecks.minLength ? 'valid' : 'invalid'}>Minimum 8 characters</li>
                  <li className={passwordChecks.upper ? 'valid' : 'invalid'}>At least one uppercase letter</li>
                  <li className={passwordChecks.lower ? 'valid' : 'invalid'}>At least one lowercase letter</li>
                  <li className={passwordChecks.number ? 'valid' : 'invalid'}>At least one number</li>
                  <li className={passwordChecks.special ? 'valid' : 'invalid'}>At least one special character</li>
                </ul>
              </div>
            )}
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
        <button type="submit" className="signup-button" disabled={!isPasswordValid}>
          Sign Up
        </button>
      </form>

      <div className="signin-text">
        <p><span className="link" onClick={() => navigate("/")}>Already have an account? Sign in</span></p>
      </div>
    </div>
  );
};

export default Signup;
