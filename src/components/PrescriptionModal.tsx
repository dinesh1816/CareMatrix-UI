import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./MedicalInfoModal.css";

type Prescription = {
  medication: string;
  dosage: string;
  frequency: string;
  instructions: string;
  prescribedDate: string;
};

interface PrescriptionModalProps {
  userId: string | null;
  onClose: () => void;
}

const baseURL = process.env.REACT_APP_API_BASE_URL;

const PrescriptionModal: React.FC<PrescriptionModalProps> = ({ userId, onClose }) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchPrescriptions = async (page: number, size: number) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(`${baseURL}/patient/${userId}/prescriptions?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch prescriptions");

      const data = await res.json();
      setPrescriptions(data.content);        // Adjust if backend uses different structure
      setTotalPages(data.totalPages);
      setTotalRecords(data.totalElements);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
    }
  };

  useEffect(() => {
    fetchPrescriptions(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // reset to first page on size change
  };

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
              <th>Frequency</th>
              <th>Instructions</th>
              <th>Prescribed Date</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.length > 0 ? (
              prescriptions.map((p, i) => (
                <tr key={i}>
                  <td>{p.medication}</td>
                  <td>{p.dosage}</td>
                  <td>{p.frequency}</td>
                  <td>{p.instructions}</td>
                  <td>{new Date(p.prescribedDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">No prescription records found.</td>
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

export default PrescriptionModal;