import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./MedicalInfoModal.css";

type Condition = {
  conditionName: string;
  status: string;
  diagnosedDate: string;
};

interface ConditionModalProps {
  userId: string | null;
  onClose: () => void;
}

const baseURL = process.env.REACT_APP_API_BASE_URL;

const ConditionModal: React.FC<ConditionModalProps> = ({ userId, onClose }) => {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchConditions = async (page: number, size: number) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`${baseURL}/patient/${userId}/conditions?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch conditions");

      const data = await response.json();
      setConditions(data.content);
      setTotalPages(data.totalPages);
      setTotalRecords(data.totalElements);
    } catch (err) {
      console.error("Error fetching conditions:", err);
    }
  };

  useEffect(() => {
    fetchConditions(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Conditions</h2>
          <X className="modal-close-btn" onClick={onClose} />
        </div>

        <table className="modal-table">
          <thead>
            <tr>
              <th>Condition Name</th>
              <th>Status</th>
              <th>Diagnosed Date</th>
            </tr>
          </thead>
          <tbody>
            {conditions.length > 0 ? (
              conditions.map((item, index) => (
                <tr key={index}>
                  <td>{item.conditionName}</td>
                  <td>{item.status}</td>
                  <td>{new Date(item.diagnosedDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">No condition records found.</td>
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

export default ConditionModal;
