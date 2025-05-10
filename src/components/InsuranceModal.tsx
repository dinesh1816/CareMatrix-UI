import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./MedicalInfoModal.css";

type Insurance = {
  providerName: string;
  policyNumber: string;
  expireDate: string;
  coverage: string;
};

interface InsuranceModalProps {
  userId: string | null;
  onClose: () => void;
}

const baseURL = process.env.REACT_APP_API_BASE_URL;

const InsuranceModal: React.FC<InsuranceModalProps> = ({ userId, onClose }) => {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchInsurances = async (page: number, size: number) => {
    try {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(`${baseURL}/patients/${userId}/insurance?page=${page-1}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch insurances");

      const data = await response.json();
      setInsurances(data.content || null); // adjust if your backend sends a different structure
      setTotalPages(data.totalPages || 1);
      setTotalRecords(data.totalElements || 0);
      console.log("insurances are", insurances);
    } catch (err) {
      console.error("Error fetching insurances:", err);
    }
  };

  useEffect(() => {
    fetchInsurances(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

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
              <th>Policy Number</th>
              <th>Expiry Date</th>
              <th>Coverage</th>
            </tr>
          </thead>
          <tbody>
            {insurances.length > 0 ? (
              insurances.map((item, index) => (
                <tr key={index}>
                  <td>{item.policyNumber}</td>
                  <td>{new Date(item.expireDate).toLocaleDateString()}</td>
                  <td>{item.coverage}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">No insurance records found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="modal-pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value={3}>3 / page</option>
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
          </select> 
        </div>
      </div>
    </div>
  );
};

export default InsuranceModal;