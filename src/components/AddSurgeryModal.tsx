import React, { useState } from "react";
import "./AddSurgeryModal.css";

interface AddSurgeryModalProps {
  onClose: () => void;
  onAdd: (surgery: {
    surgeryName: string;
    surgeryDate: string;
    surgeryHospital: string;
    notes?: string;
  }) => void;
}

const AddSurgeryModal: React.FC<AddSurgeryModalProps> = ({ onClose, onAdd }) => {
  const [surgeryName, setSurgeryName] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [surgeryHospital, setSurgeryHospital] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ surgeryName, surgeryDate, surgeryHospital, notes });
    onClose();
  };

  return (
    <div className="add-modal-overlay">
      <div className="add-modal-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Add Surgery</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Surgery Name:
            <input
              type="text"
              value={surgeryName}
              onChange={(e) => setSurgeryName(e.target.value)}
              required
            />
          </label>
          <label>
            Surgery Date:
            <input
              type="date"
              value={surgeryDate}
              onChange={(e) => setSurgeryDate(e.target.value)}
              required
            />
          </label>
          <label>
            Hospital Name:
            <input
              type="text"
              value={surgeryHospital}
              onChange={(e) => setSurgeryHospital(e.target.value)}
              required
            />
          </label>
          <label>
            Notes:
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional"
            ></textarea>
          </label>
          <div className="form-buttons">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSurgeryModal;
