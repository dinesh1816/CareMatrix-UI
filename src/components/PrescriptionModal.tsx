// src/components/PrescriptionModal.tsx

import React, { useState } from "react";
import "./MedicalInfoModal.css";
import { X } from "lucide-react";

interface Prescription {
  medication: string;
  dosage: string;
  instructions: string;
  createdAt: string;
}

interface PrescriptionModalProps {
  prescriptions: Prescription[];
  onClose: () => void;
}

const ITEMS_PER_PAGE = 5;

const PrescriptionModal: React.FC<PrescriptionModalProps> = ({ prescriptions, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(prescriptions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = prescriptions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Prescriptions</h2>
          <X className="modal-close-btn" onClick={onClose} />
        </div>
        <table className="modal-table">
          <thead>
            <tr>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Instructions</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((p, index) => (
                <tr key={index}>
                  <td>{p.medication}</td>
                  <td>{p.dosage}</td>
                  <td>{p.instructions}</td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">No prescription records found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="modal-pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
