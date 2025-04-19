import React from "react";
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
  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal">
        {/* ✅ Header with icons */}
        <div className="profile-modal-header">
          <span>Patient Profile</span>
          <div className="modal-header-icons">
            <Pencil className="edit-button" />
            <X className="close-button" onClick={onClose} />
          </div>
        </div>

        {/* ✅ Grid layout */}
        <div className="profile-grid">
          <div className="profile-field">
            <span className="profile-label">Name</span>
            <span className="profile-text">{user.username}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Email</span>
            <span className="profile-text">{user.email}</span>
          </div>

          <div className="profile-field">
            <span className="profile-label">Unique ID</span>
            <span className="profile-text">{user.uniqueId}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Age</span>
            <span className="profile-text">{user.age}</span>
          </div>

          <div className="profile-field">
            <span className="profile-label">Gender</span>
            <span className="profile-text">{user.gender}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Date of Birth</span>
            <span className="profile-text">{user.dateOfBirth}</span>
          </div>

          <div className="profile-field">
            <span className="profile-label">Contact</span>
            <span className="profile-text">{user.contact}</span>
          </div>
          <div className="profile-field">
            <span className="profile-label">Address</span>
            <span className="profile-text">{user.address}</span>
          </div>

          <div className="profile-field">
            <span className="profile-label">Blood Group</span>
            <span className="profile-text">{user.bloodGroup}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
