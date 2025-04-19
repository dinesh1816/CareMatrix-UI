import React, { useState } from "react";
import "./FilterBar.css";

type Props = {
  onFilter: (role: string, query: string) => void;
};

const FilterBar: React.FC<Props> = ({ onFilter }) => {
  const [role, setRole] = useState("All");
  const [query, setQuery] = useState("");

  const handleChange = () => {
    onFilter(role, query);
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by name, email, or ID..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleChange}
      />
      <select value={role} onChange={(e) => { setRole(e.target.value); onFilter(e.target.value, query); }}>
        <option value="All">All Users</option>
        <option value="Doctor">Doctor</option>
        <option value="Patient">Patient</option>
      </select>
    </div>
  );
};

export default FilterBar;
