import React, { useState } from "react";
import "./AddInsuranceModal.css";

interface AddInsuranceModalProps {
  onClose: () => void;
  onAdd: (insurance: {
    providerName: string;
    policyNumber: string;
    expireDate: string;
    coverage: string;
    updateAt: string;
    notes?: string;
  }) => void;
}

const AddInsuranceModal: React.FC<AddInsuranceModalProps> = ({ onClose, onAdd }) => {
  const [providerName, setProviderName] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [coverage, setCoverage] = useState("");
  const [notes, setNotes] = useState("");
  const updateAt = new Date().toString();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ providerName, policyNumber, expireDate, coverage, updateAt, notes });
    onClose();
  };

  return (
    <div className="add-modal-overlay">
      <div className="add-modal-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Add Insurance</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Provider Name:
            <input
              type="text"
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
              required
            />
          </label>
          <label>
            Policy Number:
            <input
              type="text"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              required
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="date"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
              required
            />
          </label>
          <label>
            Coverage:
            <input
              type="text"
              value={coverage}
              onChange={(e) => setCoverage(e.target.value)}
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

export default AddInsuranceModal;
