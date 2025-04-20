import React, { useState } from "react";
import "./ProfileModal.css";
import { X, Pencil } from "lucide-react";

type User = {
  username: string;
  email: string;
  uniqueId: string | number;
  age: number;
  gender: string;
  dateOfBirth: string;
  contact: string;
  address: string;
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
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.username}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">Email: </span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.email}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">Unique ID: </span>
            <span className="profile-text">{formData.uniqueId}</span>
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
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.contact}</span>
            )}
          </div>

          <div className="profile-field">
            <span className="profile-label">Address: </span>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span className="profile-text">{formData.address}</span>
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
