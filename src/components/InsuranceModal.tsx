// src/components/InsuranceModal.tsx

import React, { useState } from "react";
import "./MedicalInfoModal.css";
import { X } from "lucide-react";

type Insurance = {
  providerName: string;
  policyNumber: string;
  expireDate: string;
  coverage: string;
  updatedAt: string;
};

type Props = {
  insuranceList: Insurance[];
  onClose: () => void;
};

const ITEMS_PER_PAGE = 5;

const InsuranceModal: React.FC<Props> = ({ insuranceList, onClose }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil((insuranceList?.length || 0) / ITEMS_PER_PAGE);
  const paginated = insuranceList?.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE) || [];

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Insurance Information</h2>
          <X className="modal-close-btn" onClick={onClose} />
        </div>
        <table className="modal-table">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Policy Number</th>
              <th>Expire Date</th>
              <th>Coverage</th>
              <th>Updated On</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.providerName}</td>
                  <td>{item.policyNumber}</td>
                  <td>{item.expireDate}</td>
                  <td>{item.coverage}</td>
                  <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No insurance records found.
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

export default InsuranceModal;
