import React, { useState } from "react";
import "./AddConditionModal.css";
import { X } from "lucide-react";

interface AddConditionModalProps {
  onClose: () => void;
  onAdd: (condition: {
    conditionName: string;
    diagnosedDate: string;
    status: string;
    notes?: string;
  }) => void;
}

const AddConditionModal: React.FC<AddConditionModalProps> = ({ onClose, onAdd }) => {
  const [conditionName, setConditionName] = useState("");
  const [diagnosedDate, setDiagnosedDate] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ conditionName, diagnosedDate, status, notes });
    onClose();
  };

  return (
    <div className="add-modal-overlay">
      <div className="add-modal-container">
        <button className="close-button" onClick={onClose}><X /></button>
        <h2 className="modal-title">Add Condition</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Condition Name
            <input
              type="text"
              placeholder="Enter condition name"
              value={conditionName}
              onChange={(e) => setConditionName(e.target.value)}
              required
            />
          </label>

          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="Ongoing">Ongoing</option>
              <option value="Controlled">Controlled</option>
              <option value="Resolved">Resolved</option>
            </select>
          </label>

          <label>
            Diagnosed Date
            <input
              type="date"
              value={diagnosedDate}
              onChange={(e) => setDiagnosedDate(e.target.value)}
              required
            />
          </label>

          <label>
            Notes (Optional)
            <textarea
              placeholder="Add any additional information..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </label>

          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-button">Save Condition</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddConditionModal;
