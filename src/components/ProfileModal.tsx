import React, { useState } from "react";
import "./ProfileModal.css";
import { X, Pencil } from "lucide-react";

type User = {
  name: string;
  emailAddress: string;
  id: string | number | null;
  age: number | string;
  gender: string;
  dateOfBirth: string;
  mobileNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  bloodGroup: string;
};

type ProfileModalProps = {
  user: User;
  onClose: () => void;
};

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleSave = () => {
    console.log("Updated Profile:", formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal">
        {/* Header */}
        <div className="profile-modal-header">
          <span>
            Patient Profile <Pencil className="edit-button" onClick={() => setIsEditing(true)} />
          </span>
          <div className="modal-header-icons">
            <X className="close-button" onClick={onClose} />
          </div>
        </div>

        {/* Grid */}
        <div className="profile-grid">
          <div className="profile-field">
            <span className="profile-label">Name: </span>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.name}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">Email: </span>
            {isEditing ? (
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.emailAddress}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">Unique ID: </span>
            <span className="profile-text">{formData.id}</span>
          </div>

          <div className="profile-field">
            <span className="profile-label">Age: </span>
            {isEditing ? (
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.age}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">Gender: </span>
            {isEditing ? (
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.gender}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">Date of Birth: </span>
            {isEditing ? (
              <input
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.dateOfBirth}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">Contact: </span>
            {isEditing ? (
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.mobileNumber}</span>
            )}
          </div>
          
          <div className="profile-field">
            <span className="profile-label">Street: </span>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.street}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.street}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">City: </span>
            {isEditing ? (
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.city}</span>
            )}
          </div>



          <div className="profile-field">
            <span className="profile-label">State: </span>
            {isEditing ? (
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.state}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">Country: </span>
            {isEditing ? (
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.country}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">Zipcode: </span>
            {isEditing ? (
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.zipcode}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">Blood Group: </span>
            {isEditing ? (
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.bloodGroup}</span>
            )}
          </div>
        </div>

        {/* Footer */}
        {isEditing && (
          <div className="profile-modal-footer">
            <button className="profile-cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="profile-save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
