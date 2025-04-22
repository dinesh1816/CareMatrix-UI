import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./MedicalInfoModal.css";

type Allergy = {
  allergyName: string;
  severity: string;
};

interface AllergyModalProps {
  userId: string | null;
  onClose: () => void;
}

const baseURL = process.env.REACT_APP_API_BASE_URL;

const AllergyModal: React.FC<AllergyModalProps> = ({ userId, onClose }) => {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0); // total elements

  const fetchAllergies = async (page: number, size: number) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`${baseURL}/patients/${userId}/allergies?page=${page-1}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch allergies");

      const data = await response.json();
      setAllergies(data.content);
      setTotalPages(data.totalPages);
      setTotalRecords(data.totalElements);
    } catch (err) {
      console.error("Error fetching allergies:", err);
    }
  };

  useEffect(() => {
    fetchAllergies(currentPage, pageSize);
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
    setCurrentPage(1); // reset to page 1
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
            </tr>
          </thead>
          <tbody>
            {allergies.length > 0 ? (
              allergies.map((item, index) => (
                <tr key={index}>
                  <td>{item.allergyName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center">No allergy records found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="modal-pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
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

export default AllergyModal;