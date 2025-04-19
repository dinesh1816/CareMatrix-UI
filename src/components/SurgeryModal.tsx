// src/components/SurgeryModal.tsx

import React, { useState } from "react";
import "./MedicalInfoModal.css";
import { X } from "lucide-react";

type Surgery = {
  surgeryName: string;
  surgeryDate: string;
  surgeryHospital: string;
};

interface SurgeriesModalProps {
  surgeries: Surgery[];
  onClose: () => void;
}

const ITEMS_PER_PAGE = 5;

const SurgeryModal: React.FC<SurgeriesModalProps> = ({ surgeries, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((surgeries?.length || 0) / ITEMS_PER_PAGE);
  const currentSurgeries = surgeries?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) || [];

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Surgical History</h2>
          <X className="modal-close-btn" onClick={onClose} />
        </div>
        <table className="modal-table">
          <thead>
            <tr>
              <th>Surgery Name</th>
              <th>Date</th>
              <th>Hospital</th>
            </tr>
          </thead>
          <tbody>
            {currentSurgeries.length > 0 ? (
              currentSurgeries.map((s, i) => (
                <tr key={i}>
                  <td>{s.surgeryName}</td>
                  <td>{new Date(s.surgeryDate).toLocaleDateString()}</td>
                  <td>{s.surgeryHospital}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  No surgery records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="modal-pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurgeryModal;
