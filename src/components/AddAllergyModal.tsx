import React, { useState } from "react";
import "./AddAllergyModal.css";
import { X } from "lucide-react";

interface Allergy {
  allergyName: string;
  notes?: string;
}

interface Props {
  onClose: () => void;
  onAdd: (allergy: Allergy) => void;
}

const AddAllergyModal: React.FC<Props> = ({ onClose, onAdd }) => {
  const [allergyName, setAllergyName] = useState("");
  const [severity, setSeverity] = useState("MILD");
  const [diagnosedDate, setDiagnosedDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allergyName || !diagnosedDate) return;

    onAdd({
      allergyName,
      notes: notes || undefined,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add Allergy</h2>
          <X className="close-icon" onClick={onClose} />
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="allergyName">Allergy Name</label>
            <input
              id="allergyName"
              type="text"
              value={allergyName}
              onChange={(e) => setAllergyName(e.target.value)}
              required
              placeholder="Enter allergy name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="severity">Severity</label>
            <select
              id="severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="MILD">Mild</option>
              <option value="MODERATE">Moderate</option>
              <option value="SEVERE">Severe</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="diagnosedDate">Diagnosed Date</label>
            <input
              id="diagnosedDate"
              type="date"
              value={diagnosedDate}
              onChange={(e) => setDiagnosedDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional information..."
              rows={3}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="save-btn"
              disabled={!allergyName || !diagnosedDate}
            >
              Save Allergy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAllergyModal;
