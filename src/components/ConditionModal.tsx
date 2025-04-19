// src/components/ConditionModal.tsx

import React, { useState } from "react";
import "./MedicalInfoModal.css";
import { X } from "lucide-react";

type Condition = {
  conditionName: string;
  createdAt: string;
};

type Props = {
  conditions: Condition[];
  onClose: () => void;
};

const ITEMS_PER_PAGE = 5;

const ConditionModal: React.FC<Props> = ({ conditions, onClose }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(conditions.length / ITEMS_PER_PAGE);
  const paginated = conditions.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Current Conditions</h2>
          <X className="modal-close-btn" onClick={onClose} />
        </div>
        <table className="modal-table">
          <thead>
            <tr>
              <th>Condition Name</th>
              <th>Diagnosed On</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.conditionName}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center">
                  No condition records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="modal-pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>
          <span>{page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConditionModal;
