import React, { useState } from "react";
import { X } from "lucide-react";
import "./MedicalInfoModal.css"; // Reuse shared modal CSS

type Allergy = {
  allergyName: string;
  severity: string;
};

interface AllergyModalProps {
  allergies: Allergy[];
  onClose: () => void;
}

const ITEMS_PER_PAGE = 5;

const AllergyModal: React.FC<AllergyModalProps> = ({ allergies, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allergies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = allergies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
      <div className="modal-header">
          <h2>Allergies</h2>
          <X className="modal-close-btn" onClick={onClose} />
        </div>
        <table className="modal-table">
          <thead>
            <tr>
              <th>Allergy Name</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.allergyName}</td>
                  <td>{item.severity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center">
                  No allergy records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="modal-pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllergyModal;
