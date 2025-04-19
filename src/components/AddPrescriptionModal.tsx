import React, { useState } from "react";
import "./AddConditionModal.css"; // Reuse the same styling

interface AddPrescriptionModalProps {
  onClose: () => void;
  onAdd: (prescription: {
    medication: string;
    dosage: string;
    frequency: string;
    instructions: string;
    prescribedDate: string;
    notes?: string;
  }) => void;
}

const AddPrescriptionModal: React.FC<AddPrescriptionModalProps> = ({ onClose, onAdd }) => {
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prescribedDate, setPrescribedDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ medication, dosage, frequency, instructions, prescribedDate, notes });
    onClose();
  };

  return (
    <div className="add-modal-overlay">
      <div className="add-modal-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Add Prescription</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Medication:
            <input
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              placeholder="Enter medication name"
              required
            />
          </label>
          <label>
            Dosage:
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="E.g., 500mg"
              required
            />
          </label>
          <label>
            Instructions:
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Empty stomach"
              required
            />
          </label>
          <label>
            Frequency:
            <input
              type="text"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              placeholder="E.g., Twice a day"
              required
            />
          </label>
          <label>
            Prescribed Date:
            <input
              type="date"
              value={prescribedDate}
              onChange={(e) => setPrescribedDate(e.target.value)}
              required
            />
          </label>
          <label>
            Notes (Optional):
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional instructions..."
            ></textarea>
          </label>
          <div className="form-buttons">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPrescriptionModal;
