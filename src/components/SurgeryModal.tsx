import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./MedicalInfoModal.css";

type Surgery = {
  surgeryName: string;
  surgeryDate: string;
  surgeryHospital: string;
};

interface SurgeryModalProps {
  userId: string | null;
  onClose: () => void;
}

const baseURL = process.env.REACT_APP_API_BASE_URL;

const SurgeryModal: React.FC<SurgeryModalProps> = ({ userId, onClose }) => {
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchSurgeries = async (page: number, size: number) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patient/${userId}/surgeries?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch surgeries");

      const data = await res.json();
      setSurgeries(data.content);         // adjust if backend returns different structure
      setTotalPages(data.totalPages);
      setTotalRecords(data.totalElements);
    } catch (err) {
      console.error("Error fetching surgeries:", err);
    }
  };

  useEffect(() => {
    fetchSurgeries(currentPage, pageSize);
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
          <h2>Surgical History</h2>
          <X className="modal-close-btn" onClick={onClose} />
        </div>

        <table className="modal-table">
          <thead>
            <tr>
              <th>Surgery</th>
              <th>Date</th>
              <th>Hospital</th>
            </tr>
          </thead>
          <tbody>
            {surgeries.length > 0 ? (
              surgeries.map((s, index) => (
                <tr key={index}>
                  <td>{s.surgeryName}</td>
                  <td>{new Date(s.surgeryDate).toLocaleDateString()}</td>
                  <td>{s.surgeryHospital}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">No surgery records found.</td>
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

export default SurgeryModal;